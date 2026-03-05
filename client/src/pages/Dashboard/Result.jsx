import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import {toast} from "react-toastify";
import {API_URL} from "../../services/api_service.jsx";
import AdminResult from "../../components/adminResult.jsx";
import StudentProfileCard from "../../components/StudentProfileCard.jsx";

function Result() {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [session, setSession] = useState("2024-25");

    const [resultData, setResultData] = useState(null)

    const fetchResult = async (studentName) => {
        try {
            const {data: resData} = await axios.get(
                `${API_URL}/search_result/${studentName}?session=${session}`,
            );

            const {success, data} = resData

            if (success) {
                setResultData(data)
            }

            console.log("response", data)

        } catch (error) {
            toast.error(`Error fetching fee status: ${error.message}`);
            console.error("Error fetching fee status:", error);
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
                <h2 style={{color: "black"}}>Result</h2>

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
                        onClick={() => fetchResult(selectedStudent)}
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

                {resultData && <StudentProfileCard profileData={resultData?.student} />}

                {resultData && <AdminResult
                    subjects={resultData?.student?.classId?.subjects}
                    classN={resultData?.student?.classId?.name} result={resultData?.result} />}

                <Outlet/>
            </div>
        </div>
    );
}

export default Result;
