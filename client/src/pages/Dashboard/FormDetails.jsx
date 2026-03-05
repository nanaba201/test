import Sidebar from "../../components/Sidebar.jsx";
import axios from "axios";
import {API_URL} from "../../services/api_service.jsx";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import { User, Calendar, FileText, Phone, Mail, MapPin, Car, Award } from 'lucide-react';

const FormCards = () => {
    const [forms, setForms] = useState([])

    const fetchForms = async () => {
        try {
            const {data: resData} = await axios.get(
                `${API_URL}/form/fetch`,
            );

            const {success, forms} = resData;

            if (success) {
                setForms(forms)
            }
        } catch (error) {
            toast.error(`Error fetching forms status: ${error.message}`);
            console.error("Error fetching forms status:", error);
        }
    };

    useEffect(() => {
        fetchForms()
    }, [])

    const InfoField = ({ label, value, icon: Icon }) => (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            paddingTop: '8px',
            paddingBottom: '8px'
        }}>
            {Icon && <Icon style={{
                width: '16px',
                height: '16px',
                marginTop: '4px',
                color: '#2563eb',
                flexShrink: 0
            }} />}
            <div style={{ flex: 1 }}>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                }}>{label}:</span>
                <span style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    color: '#111827'
                }}>{value || 'Not provided'}</span>
            </div>
        </div>
    );

    const Section = ({ title, children, icon: Icon }) => (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb',
            padding: '24px',
            marginBottom: '24px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                {Icon && <Icon style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '8px',
                    color: '#2563eb'
                }} />}
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937'
                }}>{title}</h2>
            </div>
            {children}
        </div>
    );

    const ParentSection = ({ title, parentData }) => (
        <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
        }}>
            <h3 style={{
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '12px'
            }}>{title}</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
            }}>
                <InfoField label="Full Name" value={parentData.fullName} />
                <InfoField label="Qualification" value={parentData.qualification} />
                <InfoField label="Occupation" value={parentData.occupation} />
                <InfoField label="Annual Income" value={parentData.annualIncome} />
                <InfoField label="Mobile" value={parentData.mobile} icon={Phone} />
                <InfoField label="WhatsApp" value={parentData.whatsapp} icon={Phone} />
                <InfoField label="Email" value={parentData.email} icon={Mail} />
                <InfoField label="Current Address" value={parentData.currentAddress} icon={MapPin} />
                <InfoField label="Permanent Address" value={parentData.permanentAddress} icon={MapPin} />
            </div>
        </div>
    );

    return <div style={{display: "flex", height: "100vh"}}>
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
            <h2 style={{color: "black"}}>Form Details</h2>

            {forms.map((itemForm, index) => {
                const item = itemForm.data
                return <div key={index} style={{
                    maxWidth: '1152px',
                    margin: '0 auto',
                    padding: '24px',
                    backgroundColor: '#f9fafb',
                    minHeight: '100vh'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        padding: '32px',
                        marginBottom: '24px'
                    }}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}>Student Information Form</h1>

                        {/* Personal Information */}
                        <Section title="Personal Information" icon={User}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px'
                            }}>
                                <InfoField label="Student Name" value={item.studentName} />
                                <InfoField label="Date of Birth" value={item.dateOfBirth} icon={Calendar} />
                                <InfoField label="Date of Birth (Words)" value={item.dateOfBirthWords} />
                                <InfoField label="Aadhar No" value={item.aadharNo} />
                                <InfoField label="Age (Years)" value={item.age.years} />
                                <InfoField label="Age (Months)" value={item.age.months} />
                                <InfoField label="Age (Days)" value={item.age.days} />
                                <InfoField label="Gender" value={item.gender} />
                                <InfoField label="Blood Group" value={item.bloodGroup} />
                                <InfoField label="Nationality" value={item.nationality} />
                                <InfoField label="Religion" value={item.religion} />
                                <InfoField label="Minority" value={item.minority} />
                                <InfoField label="Language Proficiency" value={item.proficiency} />
                                <InfoField label="Category" value={item.category} />
                                <InfoField label="Caste" value={item.caste} />
                            </div>
                        </Section>

                        {/* Academic Information */}
                        <Section title="Academic Information" icon={FileText}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px'
                            }}>
                                <InfoField label="Previous School" value={item.previousSchool} />
                                <InfoField label="Previous Class" value={item.previousClass} />
                                <InfoField label="Year of Passing" value={item.yearOfPassing} />
                                <InfoField label="Board" value={item.board} />
                                <InfoField label="Medium of Instruction" value={item.mediumOfInstruction} />
                                <InfoField label="Marks/Grades" value={item.marksGrades} />
                                <InfoField label="CBSE LOC" value={item.cbseLoc} />
                                <InfoField label="Current Session" value={item.session} />
                                <InfoField label="Current Class" value={item.class} />
                                <InfoField label="Section" value={item.section} />
                                <InfoField label="UDISE/PEN" value={item.udisePen} />
                            </div>
                        </Section>

                        {/* Parent Information */}
                        <Section title="Parent/Guardian Information" icon={User}>
                            <ParentSection title="Father's Information" parentData={item.father} />
                            <ParentSection title="Mother's Information" parentData={item.mother} />

                            <div style={{
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '16px'
                            }}>
                                <h3 style={{
                                    fontWeight: '500',
                                    color: '#1f2937',
                                    marginBottom: '12px'
                                }}>Guardian Information</h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '16px'
                                }}>
                                    <InfoField label="Guardian Name" value={item.guardian.name} />
                                    <InfoField label="Relation" value={item.guardian.relation} />
                                    <InfoField label="Mobile" value={item.guardian.mobile} icon={Phone} />
                                </div>
                            </div>
                        </Section>

                        {/* Siblings Information */}
                        <Section title="Siblings Information" icon={User}>
                            {item.siblings.map((sibling, siblingIndex) => (
                                <div key={siblingIndex} style={{
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    marginBottom: '16px'
                                }}>
                                    <h3 style={{
                                        fontWeight: '500',
                                        color: '#1f2937',
                                        marginBottom: '12px'
                                    }}>Sibling {siblingIndex + 1}</h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                        gap: '16px'
                                    }}>
                                        <InfoField label="Name" value={sibling.name} />
                                        <InfoField label="Age" value={sibling.age} />
                                        <InfoField label="Class" value={sibling.class} />
                                        <InfoField label="School" value={sibling.school} />
                                    </div>
                                </div>
                            ))}
                        </Section>

                        {/* Additional Information */}
                        <Section title="Additional Information" icon={Car}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px'
                            }}>
                                <InfoField label="Transport Required" value={item.transportRequired} />
                            </div>
                        </Section>
                    </div>
                </div>
            })}
        </div>
    </div>
};

export default FormCards;