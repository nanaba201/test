import {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import {toast} from "react-toastify";
import {API_URL} from "../../services/api_service.jsx";
import StudentProfileCard from "../../components/StudentProfileCard.jsx";
import AdminFees from "../../components/adminFees.jsx";
import * as XLSX from 'xlsx';

function FeeDetails() {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [feeStatus, setFeeStatus] = useState({});
    const [studentId, setStudentId] = useState(null);
    const [fees, setFees] = useState([]);

    const months = [
        "Admission Form",
        "Registration Fee",
        "1st Term Fee",
        "2nd Term Fee",
        "3rd Term Fee",
        "Examination Fee",
        "Other Fee",
    ];

    useEffect(() => {
        if (selectedStudent) {
            fetchFeeStatus(selectedStudent);
        }
    }, [selectedYear]);

    const fetchFeeStatus = async (studentName) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/search_student_fee",
                {userName: studentName}
            );

            if (response.data.success && Array.isArray(response.data.fees)) {
                setFees(response.data.fees);
                setStudentId(response.data.fees[0]?.studentId || null);
            } else {
                toast.error("No student found with the provided username.");
                console.error("Unexpected API response:", response.data);
            }
        } catch (error) {
            toast.error(`Error fetching fee status: ${error.message}`);
            console.error("Error fetching fee status:", error);
        }
    };

    const changeFeeStatus = async (monthIndex) => {
        try {
            const response = await axios.post(
                `${API_URL}/change_fee_status`,
                {
                    studentId: studentId,
                    month: monthIndex + 1,
                    year: selectedYear,
                    status: "done",
                }
            );

            if (response.data.success) {
                toast.success("Fee status updated successfully!");
                setTimeout(() => fetchFeeStatus(selectedStudent), 500);
            } else {
                toast.error("Failed to update fee status.");
            }
        } catch (error) {
            toast.error(`Error updating fee status: ${error.message}`);
            console.error("Error updating fee status:", error);
        }
    };

    const years = Array.from(
        {length: new Date().getFullYear() - 1999},
        (_, i) => 2000 + i
    );

    const [session, setSession] = useState("2024-25");

    const [feeData, setFeeData] = useState(null)

    const fetchFee = async (studentName) => {
        try {
            const {data: resData} = await axios.get(
                `${API_URL}/search_fee/${studentName}?session=${session}`,
            );

            const {success, data} = resData

            if (success) {
                setFeeData(data)
            }

            console.log("response", data)

        } catch (error) {
            toast.error(`Error fetching fee status: ${error.message}`);
            console.error("Error fetching fee status:", error);
        }
    };

    const [reportData, setReportData] = useState(null);

    const fetchOverAll = async () => {
        try {
            const {data: resData} = await axios.get(
                `${API_URL}/total_due`,
            );

            const {success, data} = resData

            setReportData(data)

            console.log("response", data)

        } catch (error) {
            toast.error(`Error fetching fee status: ${error.message}`);
            console.error("Error fetching fee status:", error);
        }
    };

    useEffect(() => {
        fetchOverAll()
    }, [])

    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const downloadExcel = async () => {
        try {
            setDownloading(true);

            if (!reportData || !reportData) {
                alert('No data available for download');
                return;
            }

            console.log('Starting Excel download...', reportData);

            const data = reportData;

            // Create workbook
            const workbook = XLSX.utils.book_new();

            // Summary Sheet
            const summaryData = [
                ['Overall Due Report Summary'],
                [''],
                ['Metric', 'Value'],
                ['Total Documents', data.totalDocuments || 0],
                ['Overall Total Fee Amount', data.overallTotalFeeAmount || 0],
                ['Overall Total Received Amount', data.overallTotalReceivedAmount || 0],
                ['Overall Due Amount', data.overallDueAmount || 0],
                [''],
                ['Generated on:', new Date().toLocaleString()]
            ];

            const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

            // Student-wise Details Sheet
            const studentDetailsData = [
                [
                    'Student ID',
                    'Session',
                    'Total Fee Amount',
                    'Total Received Amount',
                    'Due Amount'
                ]
            ];

            // Add student data
            if (data.documentDetails && Array.isArray(data.documentDetails)) {
                data.documentDetails.forEach(doc => {
                    studentDetailsData.push([
                        doc.studentId || '',
                        doc.session || '',
                        doc.totalFeeAmount || 0,
                        doc.totalReceivedAmount || 0,
                        doc.dueAmount || 0
                    ]);
                });
            }

            const studentSheet = XLSX.utils.aoa_to_sheet(studentDetailsData);
            XLSX.utils.book_append_sheet(workbook, studentSheet, 'Student Details');

            // Fee Breakdown Sheet (Detailed)
            const feeBreakdownData = [
                [
                    'Student ID',
                    'Session',
                    'Fee Name',
                    'Fee Amount',
                    'Received Amount',
                    'Individual Due'
                ]
            ];

            // Add detailed fee breakdown
            if (data.documentDetails && Array.isArray(data.documentDetails)) {
                data.documentDetails.forEach(doc => {
                    if (doc.feeBreakdown && Array.isArray(doc.feeBreakdown)) {
                        doc.feeBreakdown.forEach(fee => {
                            feeBreakdownData.push([
                                doc.studentId || '',
                                doc.session || '',
                                fee.feeName || '',
                                fee.feeAmount || 0,
                                fee.receivedAmount || 0,
                                fee.individualDue || 0
                            ]);
                        });
                    }
                });
            }

            const feeBreakdownSheet = XLSX.utils.aoa_to_sheet(feeBreakdownData);
            XLSX.utils.book_append_sheet(workbook, feeBreakdownSheet, 'Fee Breakdown');

            // Generate filename with current date
            const currentDate = new Date().toISOString().split('T')[0];
            const filename = `Due_Amount_Report_${currentDate}.xlsx`;

            // Download the file
            console.log('Writing Excel file...');
            XLSX.writeFile(workbook, filename);

            console.log('Excel file downloaded successfully');
        } catch (error) {
            console.error('Error downloading Excel file:', error);
            alert('Error downloading Excel file. Please check console for details.');
        } finally {
            setDownloading(false);
        }
    };


    return (
        <div style={{display: "flex", height: "100vh"}}>
            <Sidebar/>
            <div
                style={{
                    backgroundColor: "white",
                    color: "grey",
                    overflow: "auto",
                    padding: "20px",
                    width: "83vw",
                }}
            >
                <h2 style={{color: "black"}}>Fee Details</h2>

                <div style={{display: "flex", justifyContent: "space-between"}}>

                    <div style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                        <input
                            type="text"
                            placeholder="Enter Student UserName"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            style={{
                                padding: "8px",
                                borderRadius: "5px",
                                border: "1px solid grey",
                                width: "200px",
                            }}
                        />
                        <button
                            onClick={() => fetchFee(selectedStudent)}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Search
                        </button>
                        <select
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                            style={{
                                padding: "8px",
                                borderRadius: "5px",
                                border: "1px solid grey",
                            }}
                        >

                            <option value={"2025-26"}>
                                2025-26
                            </option>

                            <option value={"2024-25"}>
                                2024-25
                            </option>
                            <option value={"2023-24"}>
                                2023-24
                            </option>
                            <option value={"2022-23"}>
                                2022-23
                            </option>
                            <option value={"2021-22"}>
                                2021-22
                            </option>

                        </select>
                    </div>

                    <button
                        onClick={downloadExcel}
                        disabled={downloading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: downloading ? 'not-allowed' : 'pointer',
                            backgroundColor: downloading ? '#9ca3af' : '#16a34a',
                            color: 'white',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            opacity: downloading ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                            if (!downloading) {
                                e.target.style.backgroundColor = '#15803d';
                                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!downloading) {
                                e.target.style.backgroundColor = '#16a34a';
                                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                            }
                        }}
                    >
                        {downloading ? (
                            <>
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}
                                ></div>
                                Downloading...
                            </>
                        ) : (
                            <>
                                {/*<Download size={20} />*/}
                                Download Excel
                            </>
                        )}
                    </button>

                </div>

                {feeData && <StudentProfileCard profileData={feeData?.student}/>}

                {feeData && <AdminFees feeList={feeData?.fees?.feesList}
                                       receipts={feeData?.fees?.receipts}
                                       classN={feeData?.student?.classId?.name}
                                       rebate={feeData?.fees?.rebate}
                                       data={{studentId: feeData?.student?._id, session: feeData?.fees?.session}}
                />}

                {/*  <table*/}
                {/*  style={{*/}
                {/*    width: "80vw",*/}
                {/*    borderCollapse: "collapse",*/}
                {/*    border: "1px solid grey",*/}
                {/*    marginTop: "20px",*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <thead>*/}
                {/*    <tr style={{ backgroundColor: "#f0f0f0" }}>*/}
                {/*      <th style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*        Month*/}
                {/*      </th>*/}
                {/*      <th style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*        Fee Status*/}
                {/*      </th>*/}
                {/*      <th style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*        Action*/}
                {/*      </th>*/}
                {/*    </tr>*/}
                {/*  </thead>*/}
                {/*  <tbody>*/}
                {/*    {months.map((month, index) => (*/}
                {/*      <tr key={month}>*/}
                {/*        <td style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*          {month}*/}
                {/*        </td>*/}
                {/*        <td style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*          {fees.find(*/}
                {/*            (fee) =>*/}
                {/*              fee.month === index + 1 && fee.year === selectedYear*/}
                {/*          )?.status || "Pending"}*/}
                {/*        </td>*/}
                {/*        <td style={{ padding: "10px", border: "1px solid grey" }}>*/}
                {/*          <button*/}
                {/*            onClick={() => changeFeeStatus(index)}*/}
                {/*            style={{*/}
                {/*              padding: "5px 10px",*/}
                {/*              backgroundColor: "green",*/}
                {/*              color: "white",*/}
                {/*              border: "none",*/}
                {/*              borderRadius: "5px",*/}
                {/*              cursor: "pointer",*/}
                {/*            }}*/}
                {/*          >*/}
                {/*            Change Status*/}
                {/*          </button>*/}
                {/*        </td>*/}
                {/*      </tr>*/}
                {/*    ))}*/}
                {/*  </tbody>*/}
                {/*</table>*/}
                {/*<Outlet />*/}
            </div>
        </div>
    );
}

export default FeeDetails;
