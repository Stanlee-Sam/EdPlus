import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="about" element={<About />} /> */}
    </Routes>
  )
  ;
};

export default App;
