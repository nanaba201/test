import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import Online from "./pages/Online";
import Login from "./pages/Login";
import Infrastructure from "./pages/Infrastructure";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AddNewUser from "./pages/Dashboard/AddNewUser.jsx";
import AddClass from "./pages/Dashboard/AddClass.jsx";
import FeeDetails from "./pages/Dashboard/FeeDetails.jsx";
import FromThePrincipalDesk from "./pages/About/FormThePrincipalDesk.jsx";
import FromTheChairmanDesk from "./pages/About/FromTheChairmanDesk.jsx";
import MissionVision from "./pages/About/Mission&Vision.jsx";
import SubjectCombination from "./pages/Academics/SubjectCombination.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import {ToastContainer, toast} from "react-toastify";
import TransferCertificateDetails from "./pages/Dashboard/TransferCertificate.jsx";
import CBSEMandatoryDisclosure from "./pages/Cbse_corner";
import SchoolLogoNavbar from "./components/SchoolLogoNavbar.jsx";
import TeacherDashboard from "./pages/Dashboard/Teacher/TeacherDashboard.jsx";
import TeacherAddClass from "./pages/Dashboard/Teacher/TeacherAddClass.jsx";
import TeacherAddNewUser from "./pages/Dashboard/Teacher/TeacherAddNewUser.jsx";
import TeacherFeeDetails from "./pages/Dashboard/Teacher/TeacherFeeDetails.jsx";
import TeacherTransferCertificate from "./pages/Dashboard/Teacher/TeacherTransferCertificate.jsx";
import StudentDashboard from "./pages/Dashboard/Student/StudentDashboard.jsx";
import StudentAddClass from "./pages/Dashboard/Student/StudentAddClass.jsx";
import StudentAddNewUser from "./pages/Dashboard/Student/StudentAddNewUser.jsx";
import StudentFeeDetails from "./pages/Dashboard/Student/StudentFeeDetails.jsx";
import StudentTransferCertificate from "./pages/Dashboard/Student/StudentTransferCertificate.jsx";
import StudentResult from "./pages/Dashboard/Student/StudentResult.jsx";
import EdenCricketAcademy from "./pages/ECA/EdenCricketAcademy.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import TeacherResult from "./pages/Dashboard/Teacher/TeacherResult.jsx";
import Result from "./pages/Dashboard/Result.jsx";


const Layout = ({children}) => {
    const location = useLocation();
    const hiddenRoutes = [
        "/dashboard",
        "/admin-dashboard",
        "/admin-dashboard/addNewUser",
        "/admin-dashboard/addclass",
        "/admin-dashboard/feedetails",
        "/admin-dashboard/result",
        "/admin-dashboard/transferCertificate",
        "/teacher-dashboard",
        "/teacher-dashboard/addNewUser",
        "/teacher-dashboard/addclass",
        "/teacher-dashboard/feedetails",
        "/teacher-dashboard/transferCertificate",
        "/teacher-dashboard/result",
        "/student-dashboard/addNewUser",
        "/student-dashboard/addclass",
        "/student-dashboard/feedetails",
        "/student-dashboard/transferCertificate",
        "/student-dashboard/result",
    ];

    const isHiddenRoute = hiddenRoutes.includes(location.pathname);
    const isHomePage = location.pathname === "/";

    return (
        <>
            {!isHiddenRoute && (isHomePage ? <Navbar/> : <SchoolLogoNavbar/>)}
            <div style={{marginTop: isHiddenRoute ? "0" : "0vh"}}>{children}</div>
            {!isHiddenRoute && <Footer/>}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about/mission-&-vision" element={<MissionVision/>}/>
                    <Route
                        path="/about/from-the-principal-desk"
                        element={<FromThePrincipalDesk/>}
                    />
                    <Route
                        path="/about/from-the-chairman-desk"
                        element={<FromTheChairmanDesk/>}
                    />
                    <Route
                        path="/academics/subject-combination"
                        element={<SubjectCombination/>}
                    />
                    <Route
                        path="/cbse-corner/cbse-mandatory-disclosure"
                        element={<CBSEMandatoryDisclosure/>}
                    />
                    <Route path="/academics" element={<Academics/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/infrastructure" element={<Infrastructure/>}/>
                    <Route path="/online" element={<Online/>}/>
                    <Route path="/online/login" element={<Login/>}/>
                    <Route
                        path="/eca/eden-cricket-academy"
                        element={<EdenCricketAcademy/>}
                    />
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route
                            path="/admin-dashboard/addNewUser"
                            element={<AddNewUser/>}
                        />
                        <Route path="/admin-dashboard/addclass" element={<AddClass/>}/>
                        <Route path="/dashboard/feedetails" element={<FeeDetails/>}/>
                        <Route
                            path="/admin-dashboard/transferCertificate"
                            element={<TransferCertificateDetails/>}
                        />
                        <Route
                            path="/admin-dashboard/feedetails"
                            element={<FeeDetails/>}
                        />

                        <Route
                            path="/admin-dashboard/result"
                            element={<Result/>}
                        />

                        <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
                        <Route
                            path="/teacher-dashboard/addclass"
                            element={<TeacherAddClass/>}
                        />
                        <Route
                            path="/teacher-dashboard/addnewuser"
                            element={<TeacherAddNewUser/>}
                        />
                        <Route
                            path="/teacher-dashboard/feedetails"
                            element={<TeacherFeeDetails/>}
                        />
                        <Route
                            path="/teacher-dashboard/transferCertificate"
                            element={<TeacherTransferCertificate/>}
                        />
                        <Route
                            path="/teacher-dashboard/result"
                            element={<Result/>}
                        />
                        <Route
                            path="/student-dashboard/addclass"
                            element={<StudentAddClass/>}
                        />
                        <Route
                            path="/student-dashboard/addnewuser"
                            element={<StudentAddNewUser/>}
                        />
                        <Route
                            path="/student-dashboard/feedetails"
                            element={<StudentFeeDetails/>}
                        />
                        <Route
                            path="/student-dashboard/transferCertificate"
                            element={<StudentTransferCertificate/>}
                        />
                        <Route
                            path="/student-dashboard/result"
                            element={<StudentResult/>}
                        />
                    </Route>
                </Routes>
                <ToastContainer/>
            </Layout>
        </Router>
    );
};

export default App;
