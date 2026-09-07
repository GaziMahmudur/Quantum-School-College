import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Plus, Users, Edit2, Trash2 } from 'lucide-react';

export default function Teachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/teachers')
      .then(res => setTeachers(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to deactivate this teacher?")) {
      try {
        await fetchApi(`/teachers/${id}`, { method: 'DELETE' });
        setTeachers(prev => prev.filter(t => t.id !== id));
      } catch (err: any) {
        alert(err.message || 'Error occurred');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Faculty Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage teaching staff and departments.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
             <div className="text-center p-10 text-slate-500">Loading directory...</div>
          ) : teachers.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No internal staff found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Designation / Role</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {t.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{t.firstName} {t.lastName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{t.phone || t.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">{t.designation || 'Teacher'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t.employeeId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        t.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                       <button onClick={() => handleDelete(t.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
