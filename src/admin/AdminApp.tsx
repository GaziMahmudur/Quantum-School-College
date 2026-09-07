import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Academic from './pages/Academic';
import Exams from './pages/Exams';
import GalleryFiles from './pages/Gallery';
import InstitutionSettings from './pages/Settings';
import Users from './pages/Users';
import Attendance from './pages/Attendance';


export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="staff" element={<Teachers />} />
          <Route path="academic" element={<Academic />} />
          <Route path="exams" element={<Exams />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="notices" element={<Notices />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<GalleryFiles />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<InstitutionSettings />} />
          
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
