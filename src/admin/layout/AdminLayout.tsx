import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { getAuthToken, clearAuthToken, fetchApi } from '../api/client';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BellRing,
  Award,
  BookOpen,
  LogOut,
  Menu,
  X,
  UserCog,
  FileText,
  Settings2,
  FolderOpen,
  Clock
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  if (!getAuthToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchApi('/auth/me')
      .then((res) => {
        if (res.success) {
          setUser(res.user);
        }
      })
      .catch(() => {
        // Auth failed handled by client interceptor automatically
      })
      .finally(() => setLoading(false));
  }, []);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAuthToken();
    navigate('/admin/login');
  };

  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, exact: true }
      ]
    },
    {
      title: 'People',
      items: [
        { label: 'Students', path: '/admin/students', icon: <GraduationCap className="w-5 h-5" /> },
        { label: 'Staff Directory', path: '/admin/staff', icon: <Users className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Academics',
      items: [
        { label: 'Classes & Org', path: '/admin/academic', icon: <BookOpen className="w-5 h-5" /> },
        { label: 'Exams Engine', path: '/admin/exams', icon: <Award className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Communication',
      items: [
        { label: 'Notices', path: '/admin/notices', icon: <BellRing className="w-5 h-5" /> },
        { label: 'Events & News', path: '/admin/events', icon: <FileText className="w-5 h-5" /> },
      ]
    },
    {
      title: 'System & Admin',
      items: [
        { label: 'User Provisioning', path: '/admin/users', icon: <UserCog className="w-5 h-5" /> },
        { label: 'Global Configurations', path: '/admin/settings', icon: <Settings2 className="w-5 h-5" /> },
        { label: 'File Gallery', path: '/admin/gallery', icon: <FolderOpen className="w-5 h-5" /> },
        { label: 'Attendance Terminal', path: '/admin/attendance', icon: <Clock className="w-5 h-5" /> },
      ]
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-[#007A6E]/20 border-t-[#007A6E] rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#0b2545] text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-[#007A6E] rounded-lg flex items-center justify-center font-bold mr-3 text-sm">Q</div>
          <span className="font-bold text-lg tracking-tight">Quantum Admin</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-slate-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        isActive ? 'bg-[#007A6E] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="p-2 bg-white/10 rounded-full text-slate-300">
              <UserCog className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate text-white">{user?.email}</div>
              <div className="text-xs text-[#007A6E] uppercase tracking-wider font-bold">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-rose-500/20 text-rose-300 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4 ml-1" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 lg:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-lg text-[#0b2545]">Quantum Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
