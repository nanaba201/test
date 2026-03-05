// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import { IconButton } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import InfoIcon from "@mui/icons-material/Visibility";
// import { toast } from "react-toastify";

// function AddClass() {
//   const [classes, setClasses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [className, setClassName] = useState("");
//   const [section, setSection] = useState("");
//   const [subjects, setSubjects] = useState([{ name: "", outOff: 100 }]);
//   const [teacherModal, setTeacherModal] = useState(null);
//   const [studentModal, setStudentModal] = useState(null);
//   const [studentInfoModal, setStudentInfoModal] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [assignedStudents, setAssignedStudents] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState("");

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/fetch_class");
//         const result = await response.json();
//         if (result.success) {
//           // Fetch assigned teachers and students for each class
//           const updatedClasses = await Promise.all(
//             result.classes.map(async (classItem) => {
//               // Fetch assigned teachers
//               const teacherResponse = await fetch(
//                 `http://localhost:5000/fetch_user_by_class/${classItem._id}?role=teacher`
//               );
//               const teacherResult = await teacherResponse.json();

//               // Fetch assigned students
//               const studentResponse = await fetch(
//                 `http://localhost:5000/fetch_user_by_class/${classItem._id}?role=student`
//               );
//               const studentResult = await studentResponse.json();

//               return {
//                 ...classItem,
//                 assignedTeacher: teacherResult.success
//                   ? teacherResult.users.map((t) => t.userName).join(", ")
//                   : "Not Assigned",
//                 assignedStudent: studentResult.success
//                   ? studentResult.users.map((s) => s.userName).join(", ")
//                   : "Not Assigned",
//               };
//             })
//           );

//           setClasses(updatedClasses);
//         }
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/fetch_users?role=teacher"
//       );
//       const result = await response.json();
//       if (result.success) {
//         setTeachers(result.users);
//       }
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/fetch_users?role=student"
//       );
//       const result = await response.json();
//       if (result.success) {
//         setStudents(result.users);
//       }
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   // Assign Teacher
//   const assignTeacher = async (classId) => {
//     try {
//       // Fetch the currently assigned teacher
//       const teacherResponse = await fetch(
//         `http://localhost:5000/fetch_user_by_class/${classId}?role=teacher`
//       );
//       const teacherResult = await teacherResponse.json();

//       if (teacherResult.success && teacherResult.users.length > 0) {
//         // If a teacher is already assigned, ask for confirmation to replace
//         const confirmReplace = window.confirm(
//           "A teacher is already assigned: ${teacherResult.users[0].userName}. Do you want to replace them?"
//         );

//         if (!confirmReplace) {
//           return; // Exit if user cancels replacement
//         }
//       }

//       // Assign the new teacher
//       const response = await fetch("http://localhost:5000/assign_to_class", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: selectedTeacher, classId }),
//       });

//       const result = await response.json();
//       if (result.success) {
//         toast.success("Teacher Assigned Successfully");

//         // Fetch updated assigned teacher for the class
//         const updatedTeacherResponse = await fetch(
//           `http://localhost:5000/fetch_user_by_class/${classId}?role=teacher`
//         );
//         const updatedTeacherResult = await updatedTeacherResponse.json();

//         setClasses((prevClasses) =>
//           prevClasses.map((cls) =>
//             cls._id === classId
//               ? {
//                   ...cls,
//                   assignedTeacher: updatedTeacherResult.success
//                     ? updatedTeacherResult.users
//                         .map((t) => t.userName)
//                         .join(", ")
//                     : "Not Assigned",
//                 }
//               : cls
//           )
//         );
//         setTeacherModal(null);
//       }
//     } catch (error) {
//       console.error("Error assigning teacher:", error);
//     }
//   };

//   // Assign Students
//   const assignStudent = async (classId) => {
//     try {
//       const response = await fetch("http://localhost:5000/assign_to_class", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: selectedStudent, classId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         toast.success("Student Assigned Successfully");

//         // Fetch updated assigned students
//         const studentResponse = await fetch(
//           `http://localhost:5000/fetch_user_by_class/${classId}?role=student`
//         );
//         const studentResult = await studentResponse.json();

//         setClasses((prevClasses) =>
//           prevClasses.map((cls) =>
//             cls._id === classId
//               ? {
//                   ...cls,
//                   assignedStudent: studentResult.success
//                     ? studentResult.users.map((s) => s.userName).join(", ")
//                     : "Not Assigned",
//                 }
//               : cls
//           )
//         );
//         setStudentInfoModal(null);
//         setStudentModal(null);
//       }
//     } catch (error) {
//       console.error("Error assigning student:", error);
//     }
//   };

//   // Fetch assigned students data
//   const fetchAssignedStudents = async (classId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/fetch_user_by_class/${classId}?role=student`
//       );
//       const result = await response.json();
//       if (result.success) {
//         setAssignedStudents(result.users);
//         setStudentInfoModal(classId); // Open the modal
//       }
//     } catch (error) {
//       console.error("Error fetching assigned students:", error);
//     }
//   };

//   // Handle adding a new class
//   const handleAddClass = async () => {
//     const newClass = { name: className, section, subjects };

//     try {
//       const response = await fetch("http://localhost:5000/add_class", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newClass),
//       });

//       const result = await response.json();
//       if (result.success) {
//         setClasses([...classes, result.class]);
//         setShowModal(false); // Close modal after successful submission
//         setClassName("");
//         setSection("");
//         setSubjects([{ name: "", outOff: 100 }]);
//       }
//     } catch (error) {
//       console.error("Error adding class:", error);
//     }
//   };

//   // Handle subject input changes
//   const handleSubjectChange = (index, key, value) => {
//     const updatedSubjects = [...subjects];
//     updatedSubjects[index][key] = value;
//     setSubjects(updatedSubjects);
//   };

//   // Remove subject field
//   const removeSubjectField = (index) => {
//     setSubjects(subjects.filter((_, i) => i !== index));
//   };

//   // Add a new subject field
//   const addSubjectField = () => {
//     setSubjects([...subjects, { name: "", outOff: 100 }]);
//   };

//   // Close the Student Info Modal
//   const closeStudentInfoModal = () => {
//     setStudentInfoModal(null);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar />

//       <div
//         style={{
//           backgroundColor: "white",
//           color: "grey",
//           overflow: "auto",
//           padding: "20px",
//           width: "83vw",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "10px",
//           }}
//         >
//           <h2 style={{ color: "black" }}>Class</h2>
//           <button
//             style={{
//               color: "white",
//               padding: "10px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//             onClick={() => setShowModal(true)}
//           >
//             Add Class
//           </button>
//         </div>
//         <table
//           style={{
//             width: "80vw",
//             borderCollapse: "collapse",
//             marginTop: "20px",
//             border: "1px solid grey",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f0f0f0" }}>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Class Name
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Section
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Subjects
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Assigned Teacher
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Assigned Students
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {classes.map((classItem) => (
//               <tr key={classItem._id}>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {classItem.name}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {classItem.section}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {classItem.subjects.map((subject) => subject.name).join(", ")}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {classItem.assignedTeacher ? (
//                     <span>
//                       {classItem.assignedTeacher}{" "}
//                       <EditIcon
//                         style={{
//                           cursor: "pointer",
//                           fontSize: "18",
//                           marginLeft: 5,
//                           marginBottom: -5,
//                         }}
//                         onClick={() => {
//                           setTeacherModal(classItem._id);
//                           fetchTeachers();
//                         }}
//                       />
//                     </span>
//                   ) : (
//                     <button
//                       style={{ color: "white" }}
//                       onClick={() => {
//                         setTeacherModal(classItem._id);
//                         fetchTeachers();
//                       }}
//                     >
//                       Assign
//                     </button>
//                   )}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {classItem.assignedStudent ? (
//                     <span>
//                       {classItem.assignedStudent}{" "}
//                       <InfoIcon
//                         style={{
//                           cursor: "pointer",
//                           fontSize: 18,
//                           marginLeft: 5,
//                           marginBottom: -5,
//                           transition: "color 0.3s ease-in-out",
//                           color: "grey",
//                         }}
//                         onMouseOver={(e) => (e.target.style.color = "blue")}
//                         onMouseOut={(e) => (e.target.style.color = "grey")}
//                         onClick={() => {
//                           setStudentInfoModal(classItem._id);
//                           fetchAssignedStudents(classItem._id);
//                         }}
//                       />
//                     </span>
//                   ) : (
//                     <button
//                       style={{ color: "white" }}
//                       onClick={() => {
//                         setStudentInfoModal(classItem._id);
//                         fetchStudents();
//                       }}
//                     >
//                       Assign
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showModal && (
//         <div
//           onClick={() => setShowModal(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "25vw",
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
//             }}
//           >
//             <h3>Add Class</h3>
//             <input
//               type="text"
//               value={className}
//               placeholder="Class Name"
//               onChange={(e) => setClassName(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "5px",
//                 marginBottom: "10px",
//                 borderRadius: "4px",
//               }}
//             />

//             <input
//               type="text"
//               placeholder="Section"
//               value={section}
//               onChange={(e) => setSection(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "5px",
//                 marginBottom: "10px",
//                 borderRadius: "4px",
//               }}
//             />

//             {subjects.map((subject, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-around",
//                   marginBottom: "5px",
//                   gap: "10px",
//                 }}
//               >
//                 <input
//                   type="text"
//                   placeholder="Subject Name"
//                   value={subject.name}
//                   onChange={(e) =>
//                     handleSubjectChange(index, "name", e.target.value)
//                   }
//                   style={{
//                     padding: "5px",
//                     borderRadius: "10",
//                     borderRadius: "4px",
//                   }}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Out Of"
//                   value={subject.outOff}
//                   onChange={(e) =>
//                     handleSubjectChange(index, "outOff", e.target.value)
//                   }
//                   style={{ padding: "5px", width: "80px", borderRadius: "4px" }}
//                 />
//                 <IconButton
//                   onClick={addSubjectField}
//                   style={{
//                     marginBottom: "10px",
//                     cursor: "pointer",
//                     color: "white",
//                     backgroundColor: "green",
//                   }}
//                 >
//                   <AddIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => removeSubjectField(index)}
//                   style={{
//                     marginBottom: "10px",
//                     cursor: "pointer",
//                     color: "white",
//                     backgroundColor: "red",
//                   }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </div>
//             ))}

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "center",
//               }}
//             >
//               <button
//                 onClick={handleAddClass}
//                 style={{
//                   background: "green",
//                   color: "white",
//                   padding: "10px",
//                   marginTop: "20px",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {teacherModal && (
//         <div
//           onClick={() => setTeacherModal(null)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "25vw",
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>Assign Teacher</h3>
//             <select
//               value={selectedTeacher}
//               onChange={(e) => setSelectedTeacher(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "5px",
//                 marginBottom: "10px",
//                 borderRadius: "4px",
//               }}
//             >
//               <option value="">Select Teacher</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.userName}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => assignTeacher(teacherModal)}
//               style={{
//                 background: "green",
//                 color: "white",
//                 padding: "10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Assign
//             </button>
//           </div>
//         </div>
//       )}

//       {studentModal && (
//         <div
//           onClick={() => {
//             setStudentModal(classItem._id);
//             fetchStudents();
//           }}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "25vw",
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>Assign Students</h3>
//             <select
//               value={selectedStudent}
//               onChange={(e) => setSelectedStudent(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "5px",
//                 marginBottom: "10px",
//                 borderRadius: "4px",
//               }}
//             >
//               <option value="">Select Student</option>
//               {students.map((student) => (
//                 <option key={student._id} value={student._id}>
//                   {student.userName}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => assignStudent(studentModal)}
//               style={{
//                 background: "green",
//                 color: "white",
//                 padding: "10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Assign
//             </button>
//           </div>
//         </div>
//       )}

//       {studentInfoModal && (
//         <div
//           onClick={closeStudentInfoModal}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "40vw",
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
//             }}
//           >
//             <h3>Assigned Students</h3>
//             <ul style={{ listStyleType: "none", padding: 0 }}>
//               {assignedStudents.map((student) => (
//                 <li key={student._id} style={{ marginBottom: "10px" }}>
//                   {student.userName}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={() => {
//                 setStudentModal(classItem._id);
//                 fetchStudents();
//               }}
//               style={{
//                 background: "green",
//                 color: "white",
//                 padding: "10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginTop: "10px",
//               }}
//             >
//               Assign Students
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddClass;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import {API_URL} from "../../services/api_service.jsx";

function AddClass() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", outOff: 100 }]);
  const [teacherModal, setTeacherModal] = useState(null);
  const [studentModal, setStudentModal] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_URL}/fetch_class`);
        const result = await response.json();
        if (result.success) {
          // Fetch assigned teachers and students for each class
          const updatedClasses = await Promise.all(
            result.classes.map(async (classItem) => {
              // Fetch assigned teachers
              const teacherResponse = await fetch(
                `${API_URL}/fetch_user_by_class/${classItem._id}?role=teacher`
              );
              const teacherResult = await teacherResponse.json();

              // Fetch assigned students
              const studentResponse = await fetch(
                `${API_URL}/fetch_user_by_class/${classItem._id}?role=student`
              );
              const studentResult = await studentResponse.json();

              return {
                ...classItem,
                assignedTeacher: teacherResult.success
                  ? teacherResult.users.map((t) => t.userName).join(", ")
                  : "Not Assigned",
                assignedStudent: studentResult.success
                  ? studentResult.users.map((s) => s.userName).join(", ")
                  : "Not Assigned",
              };
            })
          );

          setClasses(updatedClasses);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/fetch_users?role=teacher`
      );
      const result = await response.json();
      if (result.success) {
        setTeachers(result.users);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/fetch_users?role=student`
      );
      const result = await response.json();
      if (result.success) {
        setStudents(result.users);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Assign Teacher
  // const assignTeacher = async (classId) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/assign_to_class", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userId: selectedTeacher, classId }),
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       toast.success("Teacher Assigned Successfully");

  //       // Fetch updated assigned teacher for the class
  //       const teacherResponse = await fetch(
  //         `http://localhost:5000/fetch_user_by_class/${classId}?role=teacher`
  //       );
  //       const teacherResult = await teacherResponse.json();

  //       setClasses((prevClasses) =>
  //         prevClasses.map((cls) =>
  //           cls._id === classId
  //             ? {
  //                 ...cls,
  //                 assignedTeacher: teacherResult.success
  //                   ? teacherResult.users.map((t) => t.userName).join(", ")
  //                   : "Not Assigned",
  //               }
  //             : cls
  //         )
  //       );
  //       setTeacherModal(null);
  //     }
  //   } catch (error) {
  //     console.error("Error assigning teacher:", error);
  //   }
  // };

  const assignTeacher = async (classId) => {
    try {
      // Fetch the currently assigned teacher
      const teacherResponse = await fetch(
        `${API_URL}/fetch_user_by_class/${classId}?role=teacher`
      );
      const teacherResult = await teacherResponse.json();

      if (teacherResult.success && teacherResult.users.length > 0) {
        // If a teacher is already assigned, ask for confirmation to replace
        const confirmReplace = window.confirm(
          `A teacher is already assigned: ${teacherResult.users[0].userName}. Do you want to replace them?`
        );

        if (!confirmReplace) {
          return; // Exit if user cancels replacement
        }
      }

      // Assign the new teacher
      const response = await fetch(`${API_URL}/assign_to_class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedTeacher, classId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Teacher Assigned Successfully");

        // Fetch updated assigned teacher for the class
        const updatedTeacherResponse = await fetch(
          `${API_URL}/fetch_user_by_class/${classId}?role=teacher`
        );
        const updatedTeacherResult = await updatedTeacherResponse.json();

        setClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls._id === classId
              ? {
                  ...cls,
                  assignedTeacher: updatedTeacherResult.success
                    ? updatedTeacherResult.users
                        .map((t) => t.userName)
                        .join(", ")
                    : "Not Assigned",
                }
              : cls
          )
        );
        setTeacherModal(null);
      }
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };

  // Assign Students
  const assignStudent = async (classId) => {
    try {
      const response = await fetch(`${API_URL}/assign_to_class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedStudent, classId }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Student Assigned Successfully");

        // Fetch updated assigned students
        const studentResponse = await fetch(
          `${API_URL}/fetch_user_by_class/${classId}?role=student`
        );
        const studentResult = await studentResponse.json();

        setClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls._id === classId
              ? {
                  ...cls,
                  assignedStudent: studentResult.success
                    ? studentResult.users.map((s) => s.userName).join(", ")
                    : "Not Assigned",
                }
              : cls
          )
        );
        setStudentModal(null);
      }
    } catch (error) {
      console.error("Error assigning student:", error);
    }
  };

  // Handle adding a new class
  const handleAddClass = async () => {
    const newClass = { name: className, section, subjects };

    try {
      const response = await fetch(`${API_URL}/add_class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });

      const result = await response.json();
      if (result.success) {
        setClasses([...classes, result.class]);
        setShowModal(false); // Close modal after successful submission
        setClassName("");
        setSection("");
        setSubjects([{ name: "", outOff: 100 }]);
      }
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  // Handle subject input changes
  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  // Remove subject field
  const removeSubjectField = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Add a new subject field
  const addSubjectField = () => {
    setSubjects([...subjects, { name: "", outOff: 100 }]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div
        style={{
          backgroundColor: "white",
          color: "grey",
          overflow: "auto",
          padding: "20px",
          width: "83vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "10px",
          }}
        >
          <h2 style={{ color: "black" }}>Class</h2>
          {/*<button*/}
          {/*  style={{*/}
          {/*    color: "white",*/}
          {/*    padding: "10px",*/}
          {/*    border: "none",*/}
          {/*    borderRadius: "5px",*/}
          {/*    cursor: "pointer",*/}
          {/*  }}*/}
          {/*  onClick={() => setShowModal(true)}*/}
          {/*>*/}
          {/*  Add Class*/}
          {/*</button>*/}
        </div>
        <table
          style={{
            width: "80vw",
            borderCollapse: "collapse",
            marginTop: "20px",
            border: "1px solid grey",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Class Name
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Section
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Subjects
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Assign Teacher
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Assign Students
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {classItem.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {classItem.section}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {classItem.subjects.join(", ")}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {classItem.assignedTeacher ? (
                    <span>
                      {classItem.assignedTeacher}{" "}
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTeacherModal(classItem._id);
                          fetchTeachers();
                        }}
                      />
                    </span>
                  ) : (
                    <button
                      style={{ color: "white" }}
                      onClick={() => {
                        setTeacherModal(classItem._id);
                        fetchTeachers();
                      }}
                    >
                      Assign
                    </button>
                  )}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {classItem.assignedStudent ? (
                    <span>
                      {classItem.assignedStudent}{" "}
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setStudentModal(classItem._id);
                          fetchStudents();
                        }}
                      />
                    </span>
                  ) : (
                    <button
                      style={{ color: "white" }}
                      onClick={() => {
                        setStudentModal(classItem._id);
                        fetchStudents();
                      }}
                    >
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "25vw",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Add Class</h3>
            <input
              type="text"
              value={className}
              placeholder="Class Name"
              onChange={(e) => setClassName(e.target.value)}
              style={{
                width: "100%",
                padding: "5px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            />

            <input
              type="text"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              style={{
                width: "100%",
                padding: "5px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            />

            {subjects.map((subject, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginBottom: "5px",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) =>
                    handleSubjectChange(index, "name", e.target.value)
                  }
                  style={{
                    padding: "5px",
                    borderRadius: "10",
                  }}
                />
                <input
                  type="number"
                  placeholder="Out Of"
                  value={subject.outOff}
                  onChange={(e) =>
                    handleSubjectChange(index, "outOff", e.target.value)
                  }
                  style={{ padding: "5px", width: "80px", borderRadius: "4px" }}
                />
                <IconButton
                  onClick={addSubjectField}
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "green",
                  }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => removeSubjectField(index)}
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleAddClass}
                style={{
                  background: "green",
                  color: "white",
                  padding: "10px",
                  marginTop: "20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {teacherModal && (
        <div
          onClick={() => setTeacherModal(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "25vw",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Assign Teacher</h3>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              style={{
                width: "100%",
                padding: "5px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.userName} value={teacher.userName}>
                  {teacher.userName}
                </option>
              ))}
            </select>
            <button
              onClick={() => assignTeacher(teacherModal)}
              style={{
                background: "green",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Assign
            </button>
          </div>
        </div>
      )}

      {studentModal && (
        <div
          onClick={() => setStudentModal(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "25vw",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Assign Students</h3>

            <input
                type="text"
                placeholder="Enter Student Id"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  width: "200px",
                  marginBottom: "10px",
                }}
            />

            <br />

            {/*<select*/}
            {/*  value={selectedStudent}*/}
            {/*  onChange={(e) => setSelectedStudent(e.target.value)}*/}
            {/*  style={{*/}
            {/*    width: "100%",*/}
            {/*    padding: "5px",*/}
            {/*    marginBottom: "10px",*/}
            {/*    borderRadius: "4px",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <option value="">Select Student</option>*/}
            {/*  {students.map((student) => (*/}
            {/*    <option key={student._id} value={student._id}>*/}
            {/*      {student.userName}*/}
            {/*    </option>*/}
            {/*  ))}*/}
            {/*</select>*/}
            <button
              onClick={() => assignStudent(studentModal)}
              style={{
                background: "green",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddClass;
