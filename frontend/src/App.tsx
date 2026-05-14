import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SchoolAdminSignup from "./pages/auth/SchoolAdminSignup";
import Unauthorized from "./pages/Unauthorized";
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
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/school-admin-signup" element={<SchoolAdminSignup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      >
        <Route index element={<NotificationsIndex />} />
        <Route path=":id" element={<NotificationDetail />} />
      </Route>


      {/*Superadmin pages*/}
      <Route
        path="/superadmin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin-schools"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminSchools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin-users"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminUsers />
          </ProtectedRoute>
        }
      />
      
      {/*Schooladmin pages*/}
      <Route
        path="/schooladmin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-academics"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminAcademics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-announcements"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminAnnouncements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-results"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-attendance"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-financials"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminFinancials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schooladmin-homework"
        element={
          <ProtectedRoute allowedRoles={["SCHOOL_ADMIN"]}>
            <SchoolAdminHomework />
          </ProtectedRoute>
        }
      />

      {/*Teacher pages*/}
      <Route
        path="/teacher-dashboard"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-myclasses"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherClasses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-students"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-assignments"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherAssignments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-attendance"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-results"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-messages"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherMessages />
          </ProtectedRoute>
        }
      />

      {/*Parent pages*/}
      <Route
        path="/parent-dashboard"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-students"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-attendance"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-financials"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentFinancials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-results"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-homework"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentHomework />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent-term-summary"
        element={
          <ProtectedRoute allowedRoles={["PARENT"]}>
            <ParentTermSummary />
          </ProtectedRoute>
        }
      />

      {/* 
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  );
};

export default App;
