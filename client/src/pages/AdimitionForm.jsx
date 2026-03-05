import {useState} from 'react';
import {API_URL} from "../services/api_service.jsx";
import {toast} from "react-toastify";

export default function AdmissionForm() {
    const [formData, setFormData] = useState({
        // Student Details
        studentName: '',
        dateOfBirth: '',
        dateOfBirthWords: '',
        aadharNo: '',
        age: {years: '', months: '', days: ''},
        gender: '',
        bloodGroup: '',
        nationality: '',
        religion: '',
        minority: '',
        proficiency: '',
        category: '',
        caste: '',

        // Previous School Details
        previousSchool: '',
        previousClass: '',
        yearOfPassing: '',
        board: '',
        mediumOfInstruction: '',
        marksGrades: '',
        cbseLoc: '',

        // Parent Details
        father: {
            fullName: '',
            qualification: '',
            occupation: '',
            annualIncome: '',
            mobile: '',
            whatsapp: '',
            email: '',
            currentAddress: '',
            permanentAddress: ''
        },
        mother: {
            fullName: '',
            qualification: '',
            occupation: '',
            annualIncome: '',
            mobile: '',
            whatsapp: '',
            email: '',
            currentAddress: '',
            permanentAddress: ''
        },

        // Guardian Details
        guardian: {
            name: '',
            relation: '',
            mobile: ''
        },

        // Sibling Details
        siblings: [
            {name: '', age: '', class: '', school: ''},
            {name: '', age: '', class: '', school: ''}
        ],

        // Transport
        transportRequired: '',

        // Session Details
        session: '',
        class: '',
        section: '',
        udisePen: ''
    });

    const [documents, setDocuments] = useState({
        birthCertificate: false,
        reportCard: false,
        aadharCards: false,
        photographs: false,
        bplCard: false,
        addressProof: false,
        awards: false,
        transferCertificate: false,
        casteCertificate: false,
        migrationCertificate: false,
        incomeProof: false,
        cbseLocSlip: false
    });

    const handleInputChange = (field, value, parent = null, index = null) => {
        if (parent && index !== null) {
            setFormData(prev => ({
                ...prev,
                [parent]: prev[parent].map((item, i) =>
                    i === index ? {...item, [field]: value} : item
                )
            }));
        } else if (parent) {
            setFormData(prev => ({
                ...prev,
                [parent]: {...prev[parent], [field]: value}
            }));
        } else {
            setFormData(prev => ({...prev, [field]: value}));
        }
    };

    const handleDocumentCheck = (doc) => {
        setDocuments(prev => ({...prev, [doc]: !prev[doc]}));
    };

    const containerStyle = {
        maxWidth: '1024px',
        margin: '10vh auto',
        padding: '24px',
        backgroundColor: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '24px',
        borderBottom: '2px solid black',
        paddingBottom: '16px'
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '8px'
    };

    const gridStyle = {
        display: 'grid',
        gap: '16px'
    };

    const gridCols1 = {...gridStyle, gridTemplateColumns: '1fr'};
    const gridCols2 = {...gridStyle, gridTemplateColumns: 'repeat(2, 1fr)'};
    const gridCols3 = {...gridStyle, gridTemplateColumns: 'repeat(3, 1fr)'};
    const gridCols4 = {...gridStyle, gridTemplateColumns: 'repeat(4, 1fr)'};

    const inputStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '14px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px'
    };

    const sectionHeaderStyle = {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        backgroundColor: '#f3f4f6',
        padding: '8px'
    };

    const buttonStyle = {
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px 32px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.2s'
    };

    const checkboxLabelStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
    };

    const radioStyle = {
        display: 'flex',
        gap: '16px'
    };

    const radioLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/form/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "admission",
                    data: {...formData, documents},
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Submitted successfully");
                // window.location.reload();
            } else {
                alert("Failed to submit form. Please try again.");
            }
        } catch (error) {
            alert("Error submitting form. Check console for details.");
            console.error("Submission error:", error);
        }
    }

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <h1 style={titleStyle}>ADMISSION FORM</h1>
                <div style={{marginTop: '8px', fontSize: '14px'}}>
                    Affiliation No: 1730176 School Code: 10525
                </div>
            </div>

            {/* Session and Class Details */}
            <div style={{...gridCols4, marginBottom: '24px'}}>
                <div>
                    <label style={labelStyle}>Session:</label>
                    <input
                        type="text"
                        placeholder="20__ - 20__"
                        style={inputStyle}
                        value={formData.session}
                        onChange={(e) => handleInputChange('session', e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Class:</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={formData.class}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Section:</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={formData.section}
                        onChange={(e) => handleInputChange('section', e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>UDISE PEN No.:</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={formData.udisePen}
                        onChange={(e) => handleInputChange('udisePen', e.target.value)}
                    />
                </div>
            </div>

            {/* Student Details */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>Student Details</h2>

                <div style={gridCols1}>
                    <div>
                        <label style={labelStyle}>1. Name of the student (in Block letters):</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.studentName}
                            onChange={(e) => handleInputChange('studentName', e.target.value)}
                        />
                    </div>

                    <div style={gridCols2}>
                        <div>
                            <label style={labelStyle}>2. Date of Birth (DD-MM-YY):</label>
                            <input
                                type="date"
                                style={inputStyle}
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Date of Birth (in words):</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.dateOfBirthWords}
                                onChange={(e) => handleInputChange('dateOfBirthWords', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>3. Aadhar No.:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.aadharNo}
                            onChange={(e) => handleInputChange('aadharNo', e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>4. Age (As on 1/4/{new Date().getFullYear()}):</label>
                        <div style={gridCols3}>
                            <input
                                type="text"
                                placeholder="Years"
                                style={inputStyle}
                                value={formData.age.years}
                                onChange={(e) => handleInputChange('years', e.target.value, 'age')}
                            />
                            <input
                                type="text"
                                placeholder="Months"
                                style={inputStyle}
                                value={formData.age.months}
                                onChange={(e) => handleInputChange('months', e.target.value, 'age')}
                            />
                            <input
                                type="text"
                                placeholder="Days"
                                style={inputStyle}
                                value={formData.age.days}
                                onChange={(e) => handleInputChange('days', e.target.value, 'age')}
                            />
                        </div>
                    </div>

                    <div style={gridCols3}>
                        <div>
                            <label style={labelStyle}>5. Gender:</label>
                            <select
                                style={inputStyle}
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>6. Blood Group:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.bloodGroup}
                                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>7. Nationality:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.nationality}
                                onChange={(e) => handleInputChange('nationality', e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={gridCols3}>
                        <div>
                            <label style={labelStyle}>8. Religion:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.religion}
                                onChange={(e) => handleInputChange('religion', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>9. Minority (Y/N):</label>
                            <select
                                style={inputStyle}
                                value={formData.minority}
                                onChange={(e) => handleInputChange('minority', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>11. Category:</label>
                            <select
                                style={inputStyle}
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="OBC">OBC</option>
                                <option value="GEN">GEN</option>
                                <option value="EWS">EWS</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>10. Proficiency in Games/ Extra Curricular Activities (if
                            any):</label>
                        <textarea
                            style={{...inputStyle, height: '60px', resize: 'vertical'}}
                            value={formData.proficiency}
                            onChange={(e) => handleInputChange('proficiency', e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Caste:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.caste}
                            onChange={(e) => handleInputChange('caste', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Previous School Details */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>Previous School Details</h2>

                <div style={gridCols1}>
                    <div>
                        <label style={labelStyle}>12. Name of previous school:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.previousSchool}
                            onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                        />
                    </div>

                    <div style={gridCols3}>
                        <div>
                            <label style={labelStyle}>Class:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.previousClass}
                                onChange={(e) => handleInputChange('previousClass', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Year of passing:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.yearOfPassing}
                                onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Board:</label>
                            <select
                                style={inputStyle}
                                value={formData.board}
                                onChange={(e) => handleInputChange('board', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="CBSE">CBSE</option>
                                <option value="ICSE">ICSE</option>
                                <option value="State">State</option>
                            </select>
                        </div>
                    </div>

                    <div style={gridCols2}>
                        <div>
                            <label style={labelStyle}>Medium of Instruction:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.mediumOfInstruction}
                                onChange={(e) => handleInputChange('mediumOfInstruction', e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Marks/ Grades and % in previous class:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={formData.marksGrades}
                                onChange={(e) => handleInputChange('marksGrades', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Class IX / X CBSE LOC Registration No.:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.cbseLoc}
                            onChange={(e) => handleInputChange('cbseLoc', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Parents Details */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>13. Parents Details</h2>

                <div style={gridCols2}>
                    {/* Father Details */}
                    <div>
                        <h3 style={{fontWeight: '500', marginBottom: '12px', color: '#2563eb'}}>Father</h3>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div>
                                <label style={labelStyle}>Full Name:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.father.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Qualification:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.father.qualification}
                                    onChange={(e) => handleInputChange('qualification', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Occupation:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.father.occupation}
                                    onChange={(e) => handleInputChange('occupation', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Annual Income:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.father.annualIncome}
                                    onChange={(e) => handleInputChange('annualIncome', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Mobile No./ SMS No.:</label>
                                <input
                                    type="tel"
                                    style={inputStyle}
                                    value={formData.father.mobile}
                                    onChange={(e) => handleInputChange('mobile', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>WhatsApp No.:</label>
                                <input
                                    type="tel"
                                    style={inputStyle}
                                    value={formData.father.whatsapp}
                                    onChange={(e) => handleInputChange('whatsapp', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Email ID:</label>
                                <input
                                    type="email"
                                    style={inputStyle}
                                    value={formData.father.email}
                                    onChange={(e) => handleInputChange('email', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Residential Address (Current):</label>
                                <textarea
                                    style={{...inputStyle, height: '80px', resize: 'vertical'}}
                                    value={formData.father.currentAddress}
                                    onChange={(e) => handleInputChange('currentAddress', e.target.value, 'father')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Permanent Address:</label>
                                <textarea
                                    style={{...inputStyle, height: '80px', resize: 'vertical'}}
                                    value={formData.father.permanentAddress}
                                    onChange={(e) => handleInputChange('permanentAddress', e.target.value, 'father')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mother Details */}
                    <div>
                        <h3 style={{fontWeight: '500', marginBottom: '12px', color: '#ec4899'}}>Mother</h3>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div>
                                <label style={labelStyle}>Full Name:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.mother.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Qualification:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.mother.qualification}
                                    onChange={(e) => handleInputChange('qualification', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Occupation:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.mother.occupation}
                                    onChange={(e) => handleInputChange('occupation', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Annual Income:</label>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={formData.mother.annualIncome}
                                    onChange={(e) => handleInputChange('annualIncome', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Mobile No./ SMS No.:</label>
                                <input
                                    type="tel"
                                    style={inputStyle}
                                    value={formData.mother.mobile}
                                    onChange={(e) => handleInputChange('mobile', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>WhatsApp No.:</label>
                                <input
                                    type="tel"
                                    style={inputStyle}
                                    value={formData.mother.whatsapp}
                                    onChange={(e) => handleInputChange('whatsapp', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Email ID:</label>
                                <input
                                    type="email"
                                    style={inputStyle}
                                    value={formData.mother.email}
                                    onChange={(e) => handleInputChange('email', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Residential Address (Current):</label>
                                <textarea
                                    style={{...inputStyle, height: '80px', resize: 'vertical'}}
                                    value={formData.mother.currentAddress}
                                    onChange={(e) => handleInputChange('currentAddress', e.target.value, 'mother')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Permanent Address:</label>
                                <textarea
                                    style={{...inputStyle, height: '80px', resize: 'vertical'}}
                                    value={formData.mother.permanentAddress}
                                    onChange={(e) => handleInputChange('permanentAddress', e.target.value, 'mother')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guardian Details */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>14. Guardian Details</h2>

                <div style={gridCols3}>
                    <div>
                        <label style={labelStyle}>Name:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.guardian.name}
                            onChange={(e) => handleInputChange('name', e.target.value, 'guardian')}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Relation:</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.guardian.relation}
                            onChange={(e) => handleInputChange('relation', e.target.value, 'guardian')}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Mobile No.:</label>
                        <input
                            type="tel"
                            style={inputStyle}
                            value={formData.guardian.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value, 'guardian')}
                        />
                    </div>
                </div>
            </div>

            {/* Sibling Details */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>15. Sibling Details</h2>

                {formData.siblings.map((sibling, index) => (
                    <div key={index} style={{...gridCols4, marginBottom: '12px'}}>
                        <div>
                            <label style={labelStyle}>Name of the Child:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={sibling.name}
                                onChange={(e) => handleInputChange('name', e.target.value, 'siblings', index)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Age:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={sibling.age}
                                onChange={(e) => handleInputChange('age', e.target.value, 'siblings', index)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Class:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={sibling.class}
                                onChange={(e) => handleInputChange('class', e.target.value, 'siblings', index)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>School:</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={sibling.school}
                                onChange={(e) => handleInputChange('school', e.target.value, 'siblings', index)}
                            />
                        </div>
                    </div>
                ))}

                <div style={{
                    marginTop: '26px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: '16px'
                }}>
                    <label style={labelStyle}>Whether School Transport is required:</label>
                    <div style={radioStyle}>
                        <label style={radioLabelStyle}>
                            <input
                                type="radio"
                                name="transport"
                                value="Yes"
                                checked={formData.transportRequired === 'Yes'}
                                onChange={(e) => handleInputChange('transportRequired', e.target.value)}
                            />
                            Yes
                        </label>
                        <label style={radioLabelStyle}>
                            <input
                                type="radio"
                                name="transport"
                                value="No"
                                checked={formData.transportRequired === 'No'}
                                onChange={(e) => handleInputChange('transportRequired', e.target.value)}
                            />
                            No
                        </label>
                    </div>
                </div>
            </div>

            {/* Documents Checklist */}
            <div style={{marginBottom: '24px'}}>
                <h2 style={sectionHeaderStyle}>16. Documents to be attached</h2>

                <div style={gridCols2}>
                    {[
                        {key: 'birthCertificate', label: 'Photo copy of Date of Birth Certificate'},
                        {key: 'reportCard', label: 'Photo copy of previous class Report Card'},
                        {key: 'aadharCards', label: 'Photo copy of Aadhar Card of Student, Mother & Father'},
                        {
                            key: 'photographs',
                            label: 'Five Passport Size Photographs of Student (in school uniform), Father & Mother'
                        },
                        {key: 'bplCard', label: 'Photo copy of BPL Card (if applicable)'},
                        {key: 'addressProof', label: 'Photo copy of Current Residential Address proof'},
                        {
                            key: 'awards',
                            label: 'Photo copy of Awards: Gallantry award, National award or State award proof (if applicable)'
                        },
                        {key: 'transferCertificate', label: 'Original Transfer Certificate from previous school'},
                        {key: 'casteCertificate', label: 'Photo copy of SC/ST/OBC Certificate (if applicable)'},
                        {key: 'migrationCertificate', label: 'Migration Certificate (if applicable)'},
                        {key: 'incomeProof', label: 'Photo copy of Income proof'},
                        {
                            key: 'cbseLocSlip',
                            label: 'Photo copy of class IX / X CBSE LOC Registration slip (if applicable) duly sealed & signed by previous School Principal'
                        }
                    ].map((doc) => (
                        <label key={doc.key} style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={documents[doc.key]}
                                onChange={() => handleDocumentCheck(doc.key)}
                                style={{marginTop: '4px'}}
                            />
                            <span style={{fontSize: '14px'}}>{doc.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div style={{
                fontSize: '14px',
                color: "grey",
                marginBottom: '20px',
            }}>
                <input
                    type="checkbox"
                    // checked={documents[doc.key]}
                    style={{marginTop: '4px'}}
                />
                I/We hereby certify that all the information provided by me/us is correct and I /we agree that if the information is found to be incorrect
                or false my/our ward shall be automatically debarred from the selection/ admission process without any correspondence in this regard.
                I /we also agree that the application/registration /short listing does not guarantee admission to my ward. I / we accept the process of
                admission undertaken by the school and I/we abide by the decision taken by the school management.
            </div>

            {/* Footer */}
            <div style={{textAlign: 'center', borderTop: '2px solid black', paddingTop: '16px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>REGISTRATION FEE IS NON REFUNDABLE
                    AND NON TRANSFERABLE</p>
                <p style={{fontSize: '14px'}}>Address: Eden International School, Suwana Road, Bhilwara</p>
            </div>

            {/* Submit Button */}
            <div style={{marginTop: '24px', textAlign: 'center'}}>
                <button
                    type="button"
                    style={buttonStyle}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}