import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import UPSCTracker from './pages/UPSCTracker';
import AcademicTracker from './pages/AcademicTracker';
import ExtraActivities from './pages/ExtraActivities';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';
import AppLayout from './components/AppLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/upsc" element={<UPSCTracker />} />
          <Route path="/academics" element={<AcademicTracker />} />
          <Route path="/content" element={<ExtraActivities />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
