import React, { useState } from 'react';
import axios from "axios";
import {API_URL} from "../services/api_service.jsx";
import {toast} from "react-toastify";

const styles = {
    container: {
        maxWidth: '900px',
        margin: '80px auto 0',
        border: '1px solid #ccc',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: '8px',
        borderBottom: '1px solid #ccc'
    },
    headerText: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr'
    },
    leftColumn: {
        borderRight: '1px solid #ccc',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr'
    },
    rightColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr'
    },
    label: {
        padding: '8px',
        fontWeight: '600',
        borderBottom: '1px solid #ccc',
        borderRight: '1px solid #ccc'
    },
    fieldContainer: {
        padding: '8px',
        borderBottom: '1px solid #ccc'
    },
    input: {
        width: '100%',
        padding: '4px',
        boxSizing: 'border-box'
    },
    buttonContainer: {
        padding: '15px',
        textAlign: 'center',
        borderTop: '1px solid #ccc'
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};


const StudentProfileCard = ({profileData}) => {
    const [studentData, setStudentData] = useState({
        name: profileData.name,
        mName: profileData.mName,
        fName: profileData.fName,
        dob: profileData.dob,
        classSection: `${profileData.classId.name} - ${profileData.classId.section}`,
        admissionNo: profileData.userName,
        penNo: profileData.penNo,
        aadharNo: profileData.aadharNo,
        rollNo: profileData.rollNo,
        contactNo: profileData.contactNo,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value
        });
    };

    const handleSave = async () => {
        console.log('Saving student data:', studentData);
        const {classSection,admissionNo, ...newProfileData } = studentData;

        // Here you would typically send this data to a server

        const {data} = await axios.post(
            `${API_URL}/save_profile`,
            {...newProfileData, userName: profileData.userName},
        );

        if(data.success){
            toast.success('Student Profile Changed Successfully!');
        }

        console.log("Profile data", data)
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.headerText}>STUDENT PROFILE</h2>
            </div>
            <div style={styles.gridContainer}>
                {/* Left column */}
                <div style={styles.leftColumn}>
                    <div style={styles.label}>Student's Name</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="name"
                            value={studentData.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Mother's Name</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="mName"
                            value={studentData.mName}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Father's Name</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="fName"
                            value={studentData.fName}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Date of Birth</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="date"
                            name="dob"
                            value={studentData.dob}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Class & Section</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="classSection"
                            value={studentData.classSection}
                            onChange={handleChange}
                            style={styles.input}
                            disabled={true}
                        />
                    </div>
                </div>

                {/* Right column */}
                <div style={styles.rightColumn}>
                    <div style={styles.label}>Admission No.</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="admissionNo"
                            value={studentData.admissionNo}
                            onChange={handleChange}
                            style={styles.input}
                            disabled={true}
                        />
                    </div>

                    <div style={styles.label}>PEN No</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="penNo"
                            value={studentData.penNo}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Aadhar No.</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="aadharNo"
                            value={studentData.aadharNo}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Roll No.</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="rollNo"
                            value={studentData.rollNo}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.label}>Contact No.</div>
                    <div style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="contactNo"
                            value={studentData.contactNo}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div style={styles.buttonContainer}>
                <button
                    style={styles.saveButton}
                    onClick={handleSave}
                >
                    Save Student Data
                </button>
            </div>
        </div>
    );
};

export default StudentProfileCard;