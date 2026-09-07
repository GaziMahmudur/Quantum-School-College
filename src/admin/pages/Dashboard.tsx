import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Users, GraduationCap, BellRing, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    notices: 0,
    classes: 0
  });
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate a quick stats by fetching lists (In real apps, use a dedicated stats endpoint)
    const loadStats = async () => {
      try {
        const [stRes, tRes, nRes, cRes] = await Promise.all([
          fetchApi('/students'),
          fetchApi('/teachers'),
          fetchApi('/notices'),
          fetchApi('/academic/classes')
        ]);
        
        setStats({
          students: stRes.data?.length || 0,
          teachers: tRes.data?.length || 0,
          notices: nRes.data?.length || 0,
          classes: cRes.data?.length || 0
        });

        if (nRes.data) {
          setNotices(nRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="text-center mt-20 text-slate-500">Loading Dashboard Data...</div>;

  const statCards = [
    { label: 'Total Students', value: stats.students, icon: <GraduationCap className="h-6 w-6" />, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Teachers', value: stats.teachers, icon: <Briefcase className="h-6 w-6" />, bg: 'bg-blue-50 text-blue-600' },
    { label: 'Active Classes', value: stats.classes, icon: <Users className="h-6 w-6" />, bg: 'bg-purple-50 text-purple-600' },
    { label: 'Published Notices', value: stats.notices, icon: <BellRing className="h-6 w-6" />, bg: 'bg-amber-50 text-amber-600' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0b2545]">Institution Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Live metrics and recent activity across the establishment.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg}`}>{card.icon}</div>
            <div>
              <div className="text-sm font-semibold text-slate-500">{card.label}</div>
              <div className="text-2xl font-bold text-slate-800">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Recent Notices</h2>
            <Link to="/admin/notices" className="text-sm font-semibold text-[#007A6E] hover:underline flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 space-y-3">
            {notices.length === 0 ? <p className="text-slate-500 text-sm">No notices yet.</p> : null}
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 items-start">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{notice.title}</h4>
                  <div className="text-xs text-slate-500 mt-1">{new Date(notice.publishedAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
