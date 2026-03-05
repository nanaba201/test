import {useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "../services/api_service.jsx";
import {toast} from "react-toastify";


export default function AdminFees({feeList, receipts: apiReceipts, rebate, data:apiData}) {
    const [rebatePercent, setRebatePercent] = useState(0);
    const [fees, setFees] = useState(
        []
    );

    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        setFees(feeList)
        setReceipts(apiReceipts)
        setRebatePercent(rebate)
    }, [feeList])

    const handleFeeChange = (index, value) => {
        const newFees = [...fees];
        newFees[index].amount = parseFloat(value) || 0;
        setFees(newFees);
    };

    const handleReceiptChange = (index, field, value) => {
        const newReceipts = [...receipts];
        if (field === 'receivedAmount') {
            newReceipts[index][field] = parseFloat(value) || 0;
        } else {
            newReceipts[index][field] = value;
        }
        setReceipts(newReceipts);
    };

    // Check if fee is eligible for rebate (only 1st, 2nd, 3rd Term Fee)
    const isEligibleForRebate = (feeName) => {
        const eligibleFees = ['1st Term Fee', '2nd Term Fee', '3rd Term Fee'];
        return eligibleFees.includes(feeName);
    };

    const calculateRebate = (amount, feeName) => {
        return isEligibleForRebate(feeName) ? (amount * rebatePercent) / 100 : 0;
    };

    const calculateReceivable = (amount, feeName) => {
        return amount - calculateRebate(amount, feeName);
    };

    const calculateDueAmount = (receivable, received) => {
        return receivable - received;
    };

    const totalFeeAmount = fees?.reduce((sum, fee) => sum + fee.amount, 0);
    // Calculate total rebate only for eligible fees
    const totalRebateAmount = fees?.reduce((sum, fee) => sum + calculateRebate(fee.amount, fee.name), 0);
    const totalReceivableAmount = totalFeeAmount - totalRebateAmount;
    const totalReceivedAmount = receipts.reduce((sum, receipt) => sum + receipt.receivedAmount, 0);
    const totalDueAmount = totalReceivableAmount - totalReceivedAmount;

    const containerStyle = {
        padding: '24px',
        backgroundColor: 'white',
        fontFamily: 'Arial, sans-serif',
        marginTop: '40px',
    };
    const rebateTopContainerStyle = {
        marginBottom: '16px',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };
    const rebateInputContainerStyle = {
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        gap: "10px"
    };
    const downloadContainer = {
        color: "blue",
        cursor: "pointer"
    }
    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        // marginBottom: '8px'
    };
    const rebateInputStyle = {
        width: '80px',
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        outline: 'none',
        fontSize: '14px'
    };
    const tableContainerStyle = {
        overflowX: 'auto'
    };
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #d1d5db'
    };
    const headerStyle = {
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        padding: '12px 16px',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '14px'
    };
    const headerCenterStyle = {
        ...headerStyle,
        textAlign: 'center'
    };
    const cellStyle = {
        border: '1px solid #d1d5db',
        padding: '12px 16px',
        fontSize: '14px'
    };
    const cellCenterStyle = {
        ...cellStyle,
        textAlign: 'center'
    };
    const calculatedCellStyle = {
        ...cellCenterStyle,
        backgroundColor: '#f9fafb'
    };
    const inputCellStyle = {
        border: '1px solid #d1d5db',
        padding: '8px'
    };
    const inputStyle = {
        width: '70%',
        padding: '6px 8px',
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        outline: 'none',
        fontSize: '14px'
    };
    const totalRowStyle = {
        backgroundColor: '#dbeafe',
        fontWeight: 'bold'
    };
    const buttonContainer = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
        marginTop: '16px'
    }
    const button = {
        padding: '8px 16px',
        backgroundColor: '#1976d2',
        color: 'white',
        fontWeight: '500',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
    }

    // Handle save button click
    const handleSave = async () => {
        // Transform the data into the required format

        const {data} = await axios.post(
            `${API_URL}/save_fee`,
            {studentId: apiData.studentId, session: apiData.session, feesList: fees, receipts, rebate: rebatePercent},
        );

        console.log("Fee data", data)
        if (data.success) {
            toast.success("Fees Saved Successfully")
        }

    };

    return (
        <div style={containerStyle}>
            <div style={rebateTopContainerStyle}>
                <div style={rebateInputContainerStyle}>
                    <label style={labelStyle}>
                        Rebate %:
                    </label>
                    <input
                        type="number"
                        value={rebatePercent}
                        onChange={(e) => setRebatePercent(parseFloat(e.target.value) || 0)}
                        style={rebateInputStyle}
                    />
                </div>
                <div style={downloadContainer}>Download</div>
            </div>

            <div style={tableContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>Fee Type</th>
                        <th style={headerCenterStyle}>Fee Amount (Rs.)</th>
                        <th style={headerCenterStyle}>Rebate Amount (Rs.)</th>
                        <th style={headerCenterStyle}>Receivable Amount (Rs.)</th>
                        <th style={headerCenterStyle}>Receipt No.</th>
                        <th style={headerCenterStyle}>Date</th>
                        <th style={headerCenterStyle}>Received Amount (Rs.)</th>
                        <th style={headerCenterStyle}>Due Amount (Rs.)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fees?.map((fee, index) => {
                        const rebateAmount = calculateRebate(fee.amount, fee.name);
                        const receivableAmount = calculateReceivable(fee.amount, fee.name);
                        const dueAmount = calculateDueAmount(receivableAmount, receipts?.[index]?.receivedAmount || 0);

                        return (
                            <tr key={index}>
                                <td style={cellStyle}>
                                    <strong>{fee.name}</strong>
                                </td>
                                <td style={inputCellStyle}>
                                    <input
                                        type="number"
                                        value={fee.amount}
                                        onChange={(e) => handleFeeChange(index, e.target.value)}
                                        style={inputStyle}
                                    />
                                </td>
                                <td style={calculatedCellStyle}>
                                    {rebateAmount.toFixed(0)}
                                </td>
                                <td style={calculatedCellStyle}>
                                    {receivableAmount.toFixed(0)}
                                </td>
                                <td style={inputCellStyle}>
                                    <input
                                        type="text"
                                        value={receipts?.[index]?.receiptNo || ''}
                                        onChange={(e) => handleReceiptChange(index, 'receiptNo', e.target.value)}
                                        style={inputStyle}
                                    />
                                </td>
                                <td style={inputCellStyle}>
                                    <input
                                        type="text"
                                        value={receipts?.[index]?.date || ''}
                                        onChange={(e) => handleReceiptChange(index, 'date', e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        style={inputStyle}
                                    />
                                </td>
                                <td style={inputCellStyle}>
                                    <input
                                        type="number"
                                        value={receipts?.[index]?.receivedAmount || ''}
                                        onChange={(e) => handleReceiptChange(index, 'receivedAmount', e.target.value)}
                                        style={inputStyle}
                                    />
                                </td>
                                <td style={calculatedCellStyle}>
                                    {dueAmount.toFixed(0)}
                                </td>
                            </tr>
                        );
                    })}

                    {/* Total Row */}
                    <tr style={totalRowStyle}>
                        <td style={cellStyle}>Total:</td>
                        <td style={cellCenterStyle}>
                            {totalFeeAmount?.toFixed(0)}
                        </td>
                        <td style={cellCenterStyle}>
                            {totalRebateAmount?.toFixed(0)}
                        </td>
                        <td style={cellCenterStyle}>
                            {totalReceivableAmount?.toFixed(0)}
                        </td>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}></td>
                        <td style={cellCenterStyle}>
                            {totalReceivedAmount?.toFixed(0)}
                        </td>
                        <td style={cellCenterStyle}>
                            {totalDueAmount?.toFixed(0)}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div style={buttonContainer}>
                <button
                    onClick={handleSave}
                    style={button}
                >
                    Save Data
                </button>
            </div>
        </div>
    );
}