import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminSchools from "./pages/super-admin/SuperAdminSchools";
import SuperAdminUsers from "./pages/super-admin/SuperAdminUsers";
import Notifications, {
  NotificationsIndex,
  NotificationDetail,
} from "./pages/Notifications";
import SchoolAdminAcademics from "./pages/school-admin/SchoolAdminAcademics";
import SchoolAdminDashboard from "./pages/school-admin/SchoolAdminDashboard";
import SchoolAdminAnnouncements from "./pages/school-admin/SchoolAdminAnnouncements";
import SchoolAdminResults from "./pages/school-admin/SchoolAdminResults";
import SchoolAdminAttendance from "./pages/school-admin/SchoolAdminAttendance";
import SchoolAdminFinancials from "./pages/school-admin/SchoolAdminFinancials";
import SchoolAdminHomework from "./pages/school-admin/SchoolAdminHomework";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherResults from "./pages/teacher/TeacherResults";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherMessages from "./pages/teacher/TeacherMessages";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentStudents from "./pages/parent/ParentStudents";
import ParentAttendance from "./pages/parent/ParentAttendance";
import ParentFinancials from "./pages/parent/ParentFinancials";
import ParentResults from "./pages/parent/ParentResults";
import ParentHomework from "./pages/parent/ParentHomework";
import ParentTermSummary from "./pages/parent/ParentTermSummary";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/superadmin-schools" element={<SuperAdminSchools />} />
      <Route path="/superadmin-users" element={<SuperAdminUsers />} />
      <Route path="/notifications" element={<Notifications />}>
        <Route index element={<NotificationsIndex />} />
        <Route path=":id" element={<NotificationDetail />} />
      </Route>
      <Route path="/schooladmin-dashboard" element={<SchoolAdminDashboard />} />
      <Route path="/schooladmin-academics" element={<SchoolAdminAcademics />} />
      <Route
        path="/schooladmin-announcements"
        element={<SchoolAdminAnnouncements />}
      />
      <Route path="/schooladmin-results" element={<SchoolAdminResults />} />
      <Route
        path="/schooladmin-attendance"
        element={<SchoolAdminAttendance />}
      />
      <Route path="/schooladmin-financials" element={<SchoolAdminFinancials />} />
      <Route path="/schooladmin-homework" element={<SchoolAdminHomework />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher-myclasses" element={<TeacherClasses />} />
      <Route path="/teacher-students" element={<TeacherStudents />} />
      <Route path="/teacher-assignments" element={<TeacherAssignments />} />
      <Route path="/teacher-attendance" element={<TeacherAttendance />} />
      <Route path="/teacher-results" element={<TeacherResults />} />
      <Route path="/teacher-messages" element={<TeacherMessages />} />

      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/parent-students" element={<ParentStudents />} />
      <Route path="/parent-attendance" element={<ParentAttendance />} />
      <Route path="/parent-financials" element={<ParentFinancials />} />
      <Route path="/parent-results" element={<ParentResults />} />
      <Route path="/parent-homework" element={<ParentHomework />} />
      <Route path="/parent-term-summary" element={<ParentTermSummary />} />

      {/* 
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
};

export default App;
