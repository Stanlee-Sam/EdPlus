import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminSchools from "./pages/super-admin/SuperAdminSchools";
import SuperAdminUsers from "./pages/super-admin/SuperAdminUsers";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/superadmin-schools" element={<SuperAdminSchools />} />
      <Route path="/superadmin-users" element={<SuperAdminUsers />} />
      
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  )
  ;
};

export default App;
