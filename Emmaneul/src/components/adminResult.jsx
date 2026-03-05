import {memo, useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "../services/api_service.jsx";
import {toast} from "react-toastify";


const returnResultHeads = (className, last) => {
    if (["Nursery","PG", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].includes(className)) {

        return {
            "Periodic Test": '0',
            "Note Book": '0',
            "Subject Enrichment": '0',
            [last]: '0'
        }

    } else if (["XI", "XII"].includes(className)) {
        return {
            "Theory MM": '0',
            "Theory MO": '0',
            "Practical MM": '0',
            "Practical MO": '0'
        }
    }
}

// Input component to keep things DRY
const NumberInput = memo(({ value, onChange }) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
            width: '60px',
            padding: '4px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px'
        }}
    />
));

const AdminResult = ({subjects, classN, result}) => {
    // Sample data for subjects
    // const subjects = ['English', 'Hindi', 'Mathematics', 'General Awareness'];

    // Initial state with empty input values
    const [formData, setFormData] = useState({
        term1: subjects?.map(() => returnResultHeads(classN, "Half Yearly")),
        term2: subjects?.map(() => returnResultHeads(classN, "Annual"))
    });

    useEffect(() => {

        if (result?.term1.length > 0) {
            setFormData((curr) => ({...curr, term1: result.term1}))
        }

        if (result?.term2.length > 0) {
            setFormData((curr) => ({...curr, term2: result.term2}))
        }

    }, [result])


    // Handle input change
    const handleInputChange = (term, subjectIndex, field, value) => {
        const updatedFormData = {...formData};
        updatedFormData[term][subjectIndex][field] = value;
        setFormData(updatedFormData);
    };

    // Handle save button click
    const handleSave = async () => {
        // Transform the data into the required format

        const {data} = await axios.post(
            `${API_URL}/save_result`,
            {studentId: result.studentId, session: result.session, ...formData},
        );

        console.log("result data", data)
        if (data.success) {
            toast.success("Result Saved Successfully")
        }

    };

    // Styles
    const styles = {
        container: {
            padding: '16px'
        },
        title: {
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '16px'
        },
        tablesContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
        },
        tableCard: {
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        tableHeader: {
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ccc'
        },
        tableWrapper: {
            overflowX: 'auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'center',
            fontWeight: '500',
            backgroundColor: '#f9f9f9'
        },
        thLeft: {
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'left',
            fontWeight: '500',
            backgroundColor: '#f9f9f9'
        },
        td: {
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'center'
        },
        tdLeft: {
            border: '1px solid #ccc',
            padding: '8px',
            textAlign: 'left',
            fontWeight: '500'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: '500',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
        },
        resultContainer: {
            marginTop: '16px',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#f9f9f9'
        },
        resultTitle: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '8px'
        },
        codeBlock: {
            backgroundColor: '#f0f0f0',
            padding: '12px',
            borderRadius: '4px',
            overflowX: 'auto',
            fontFamily: 'monospace'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Student Report Card</h2>

            <div style={styles.tablesContainer}>
                {/* Term 1 Table */}
                <div style={styles.tableCard}>
                    <h3 style={styles.tableHeader}>TERM 1</h3>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.thLeft}>SUBJECT</th>

                                {Object.keys(returnResultHeads(classN, "Half Yearly") || {}).map((val, index) =>
                                    <th key={index} style={styles.th}>{val}</th>
                                )}

                            </tr>
                            </thead>
                            <tbody>
                            {subjects?.map((subject, index) => (
                                <tr key={`term1-${index}`}>
                                    <td style={styles.tdLeft}>{subject}</td>

                                    {Object.keys(returnResultHeads(classN, "Half Yearly") || {}).map((headKey, i) =>
                                        <td key={headKey} style={styles.td}>
                                            <NumberInput
                                                value={formData.term1[index][headKey]}
                                                onChange={(val) => handleInputChange('term1', index, headKey, val)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Term 2 Table */}
                <div style={styles.tableCard}>
                    <h3 style={styles.tableHeader}>TERM 2</h3>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.thLeft}>SUBJECT</th>

                                {Object.keys(returnResultHeads(classN, "Annual") || {}).map((val, index) =>
                                    <th key={index} style={styles.th}>{val}</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {subjects?.map((subject, index) => (
                                <tr key={`term2-${index}`}>
                                    <td style={styles.tdLeft}>{subject}</td>

                                    {Object.keys(returnResultHeads(classN, "Annual") || {}).map((headKey, i) =>
                                        <td key={headKey} style={styles.td}>
                                            <NumberInput
                                                value={formData.term2[index][headKey]}
                                                onChange={(val) => handleInputChange('term2', index, headKey, val)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={styles.buttonContainer}>
                <button
                    onClick={handleSave}
                    style={styles.button}
                >
                    Save Data
                </button>
            </div>

            {/*  {savedData && (*/}
            {/*      <div style={styles.resultContainer}>*/}
            {/*          <h3 style={styles.resultTitle}>Generated Data:</h3>*/}
            {/*          <pre style={styles.codeBlock}>*/}
            {/*  {JSON.stringify(savedData, null, 2)}*/}
            {/*</pre>*/}
            {/*      </div>*/}
            {/*  )}*/}
        </div>
    );
};

export default AdminResult;