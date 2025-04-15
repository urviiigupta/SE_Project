import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import HallWardenDashboard from './pages/HallWardenDashboard';
import ControllingWardenDashboard from './pages/ControllingWardenDashboard';
import MessManagerDashboard from './pages/MessManagerDashboard';
import HallClerkDashboard from './pages/HallClerkDashboard';
import HmcChairmanDashboard from './pages/HmcChairmanDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route: redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes for all roles */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/hall-warden-dashboard" element={<HallWardenDashboard />} />
        <Route path="/controlling-warden-dashboard" element={<ControllingWardenDashboard />} />
        <Route path="/mess-manager-dashboard" element={<MessManagerDashboard />} />
        <Route path="/hall-clerk-dashboard" element={<HallClerkDashboard />} />
        <Route path="/hmc-chairman-dashboard" element={<HmcChairmanDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
