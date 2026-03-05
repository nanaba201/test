import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
import {jsPDF} from "jspdf";
import logo from "../assets/eden-logo.png"


const StudentResultCard = ({student, result}) => {
    // Handle case when data might be undefined
    if (!student || !result) {
        return <div>Loading data...</div>;
    }

    // Default values if properties are undefined
    const studentData = {
        name: student?.name || '',
        subjects: student?.classId?.subjects || [],
        userName: student?.userName || '',
        mName: student.mName,
        fName: student.fName,
        dob: student.dob,
        className: `${student.classId.name} - ${student.classId.section}`,
        admissionNo: student.userName,
        penNo: student.penNo,
        aadharNo: student.aadharNo,
        rollNo: student.rollNo,
        contactNo: student.contactNo,
    };

    const resultData = {
        session: result?.session || '2024-25',
        term1: result?.term1 || [],
        term2: result?.term2 || []
    };

    // Helper function to calculate grades based on marks
    const calculateGrade = (marks) => {
        if (!marks || marks === "0") return "E";
        const numMarks = parseInt(marks);
        if (numMarks >= 91) return "A1";
        if (numMarks >= 81) return "A2";
        if (numMarks >= 71) return "B1";
        if (numMarks >= 61) return "B2";
        if (numMarks >= 51) return "C1";
        if (numMarks >= 41) return "C2";
        if (numMarks >= 33) return "D";
        return "E";
    };

    // Helper function to calculate total marks for a term
    const calculateTermTotal = (termData) => {
        if (!termData || !Array.isArray(termData)) return 0;

        let total = 0;
        termData.forEach(subject => {
            if (subject) {
                Object.values(subject).forEach(mark => {
                    total += parseInt(mark || 0);
                });
            }
        });
        return total;
    };

    // Calculate totals
    const term1Total = calculateTermTotal(resultData.term1);
    const term2Total = calculateTermTotal(resultData.term2);
    const grandTotal = term1Total + term2Total;
    const percentage = grandTotal > 0 ? ((grandTotal / (studentData?.subjects.length * 2 * 100)) * 100).toFixed(2) : '0.00';

    const downloadPdf = () => {
        htmlToImage.toPng(document.getElementById('reportCard'), { quality: 1, pixelRatio: 3 })  // Increase pixelRatio
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4'
                });

                const imgProps = pdf.getImageProperties(dataUrl);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST'); // Use 'FAST' for better quality
                pdf.save("download.pdf");
            });
    };

    return (

        <>
            <div onClick={downloadPdf} style={{cursor: "pointer", marginBottom: "20px", textAlign: "left"}}>Download
            </div>
            <div id="reportCard" style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '850px',
                // margin: '0 auto',
                border: '1px solid #000',
                padding: '20px'
            }}>
                {/* Header */}
                <div style={{display: "flex"}}>
                    <img src={logo} style={{width: 100, height: 100, paddingRight: '40px'}}/>
                    <div>
                        <h2 style={{margin: '5px 0', color: "blue"}}> EMMANUEL SENIOR SECONDARY SCHOOL</h2>
                        <p style={{margin: '5px 0', fontSize: '14px'}}>
                            (An English Medium Co-Educational Sr. Sec. School (AFFILIATED to C.B.S.E. Delhi)
                        </p>
                        <p style={{margin: '5px 0', fontSize: '14px'}}>
                            ROOP NAGAR, JALORE (RAJASTHAN) - 343001
                        </p>
                        <p style={{margin: '5px 0', fontSize: '14px'}}>
                            <span style={{marginRight: "30px"}}>AFFILIATION NO. :- 1730407</span>
                            <span>SCHOOL CODE :- 10750</span>
                        </p>
                        <h3 style={{margin: '10px 0', textDecoration: 'underline'}}>REPORT CARD</h3>
                    </div>
                </div>

                {/* Student Info */}
                <div style={{
                    border: '1px solid #000',
                    paddingTop: '5px', margin: '5px 0'
                }}>

                    <h4 style={{margin: '0 0', textDecoration: 'underline'}}>STUDENT PROFILE</h4>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        // margin: '20px 0',
                        // padding: '10px'
                    }}>
                        <div style={{borderRight: '1px solid #000', padding: '0 10px', textAlign: "left"}}>
                            <p style={{margin: "10px 0"}}><strong>Student's Name:</strong> {studentData.name}</p>
                            <p style={{margin: "10px 0"}}><strong>Mother's Name:</strong> {studentData.mName} </p>
                            <p style={{margin: "10px 0"}}><strong>Father's Name:</strong>{studentData.fName}</p>
                            <p style={{margin: "10px 0"}}><strong>Date of Birth:</strong>{studentData.dob}</p>
                            <p style={{margin: "10px 0"}}><strong>Pen No.:</strong>{studentData.penNo}</p>
                        </div>
                        <div style={{padding: '0 10px', textAlign: "left"}}>
                            <p style={{margin: "10px 0"}}><strong>Admission No.: </strong> {studentData.userName} </p>
                            <p style={{margin: "10px 0"}}><strong>Roll No.:</strong>{studentData.rollNo}</p>
                            <p style={{margin: "10px 0"}}><strong>Aadhaar No.:</strong>{studentData.aadharNo}</p>
                            <p style={{margin: "10px 0"}}><strong>Class & Section:</strong> {studentData.className}</p>
                            <p style={{margin: "10px 0"}}><strong>Contact No:</strong> {studentData.contactNo}</p>
                        </div>
                    </div>
                </div>

                {/* Academic Performance */}
                <h3 style={{textAlign: 'center', margin: '10px 0', color: "red"}}>ACADEMIC
                    PERFORMANCE {resultData.session}</h3>

                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid #000',
                    marginBottom: '20px'
                }}>
                    <thead>
                    <tr>
                        <th rowSpan="2" style={{border: '1px solid #000', padding: '5px'}}>SUBJECT</th>
                        <th colSpan="4" style={{border: '1px solid #000', padding: '5px'}}>TERM 1</th>
                        <th colSpan="4" style={{border: '1px solid #000', padding: '5px'}}>TERM 2</th>
                        <th colSpan="3" style={{border: '1px solid #000', padding: '5px'}}>GRAND TOTAL</th>
                    </tr>
                    <tr>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Periodic Test</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Note Book</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Subject Enrichment</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Half Yearly</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Periodic Test</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Note Book</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Subject Enrichment</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>Annual</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>MM</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>MO</th>
                        <th style={{border: '1px solid #000', padding: '5px'}}>FINAL GRADE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentData.subjects.map((subject, index) => {
                        const term1Data = resultData.term1[index] || {};
                        const term2Data = resultData.term2[index] || {};

                        const term1Total = parseInt(term1Data["Periodic Test"] || 0) +
                            parseInt(term1Data["Note Book"] || 0) +
                            parseInt(term1Data["Subject Enrichment"] || 0) +
                            parseInt(term1Data["Half Yearly"] || 0);

                        const term2Total = parseInt(term2Data["Periodic Test"] || 0) +
                            parseInt(term2Data["Note Book"] || 0) +
                            parseInt(term2Data["Subject Enrichment"] || 0) +
                            parseInt(term2Data["Annual"] || 0);

                        const subjectTotal = term1Total + term2Total;
                        const finalGrade = calculateGrade(subjectTotal / 2);

                        return (
                            <tr key={index}>
                                <td style={{border: '1px solid #000', padding: '5px'}}>{subject}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term1Data["Periodic Test"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term1Data["Note Book"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term1Data["Subject Enrichment"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term1Data["Half Yearly"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term2Data["Periodic Test"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term2Data["Note Book"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term2Data["Subject Enrichment"] || "0"}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{term2Data["Annual"] || "0"}</td>
                                <td style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>200</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{subjectTotal}</td>
                                <td style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                    textAlign: 'center'
                                }}>{finalGrade}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td style={{border: '1px solid #000', padding: '5px', fontWeight: 'bold'}}>TOTAL</td>
                        <td colSpan="4"
                            style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>{term1Total}</td>
                        <td colSpan="4"
                            style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>{term2Total}</td>
                        <td style={{
                            border: '1px solid #000',
                            padding: '5px',
                            textAlign: 'center'
                        }}>{studentData?.subjects.length * 2 * 100}</td>
                        <td style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>{grandTotal}</td>
                        <td style={{
                            border: '1px solid #000',
                            padding: '5px',
                            textAlign: 'center'
                        }}>{calculateGrade(grandTotal / (studentData?.subjects.length * 2))}</td>
                    </tr>
                    </tbody>
                </table>

                {/* Co-Scholastic Activities */}

                {/* Attendance and Final Result */}
                <div style={{
                    display: "flex",
                    gap: 10
                }}>

                    <table style={{
                        width: '50%',
                        borderCollapse: 'collapse',
                        border: '1px solid #000',
                    }}>
                        <tbody>
                        <tr>
                            <td style={{border: '1px solid #000', padding: '5px', width: '60%'}}>Work Experience (500)
                            </td>
                            <td style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>A1</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #000', padding: '5px'}}>Physical & Health education (502)
                            </td>
                            <td style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>A1</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #000', padding: '5px'}}>General Studies (503)</td>
                            <td style={{border: '1px solid #000', padding: '5px', textAlign: 'center'}}>A1</td>
                        </tr>
                        </tbody>
                    </table>

                    {/* Attendance and Final Result */}
                    <div style={{
                        // display: 'grid',
                        // gridTemplateColumns: '1fr 1fr',
                        // gap: '10px',
                        textAlign: "left",
                        flex: 1
                    }}>
                        <div style={{
                            border: '1px solid #000',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <p style={{margin: "10px 0"}}><strong>Total working Days: </strong> __________________</p>
                            <p style={{margin: "10px 0"}}><strong>Total Attendance: </strong> ____________________</p>
                            <p style={{margin: "10px 0"}}><strong>FINAL RESULT:</strong>  ____________________</p>
                            <p style={{margin: "10px 0"}}><strong>FINAL %:</strong> {percentage}%</p>
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                }}>
                    <div style={{textAlign: 'center', width: '150px'}}>
                        <div style={{borderTop: '1px solid #000', marginTop: '40px'}}>
                            <p>Class Teacher</p>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', width: '150px'}}>
                        <div style={{borderTop: '1px solid #000', marginTop: '40px'}}>
                            <p>Date of Issue</p>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', width: '150px'}}>
                        <div style={{borderTop: '1px solid #000', marginTop: '40px'}}>
                            <p>Principal</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentResultCard;