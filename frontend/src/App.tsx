import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminSchools from "./pages/super-admin/SuperAdminSchools";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/super-admin/schools" element={<SuperAdminSchools />} />

      
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  )
  ;
};

export default App;
