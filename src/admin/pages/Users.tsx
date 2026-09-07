import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Plus, Settings2, Trash2 } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch users via a dedicated endpoint if available (I'll fetch from custom /api/students since User model wraps students/staff/teachers)
    fetchApi('/students') 
      .then(res => {
         const mapped = (res.data || []).map((s: any) => ({ ...s.user, profile: s.firstName }));
         setUsers(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Super Admin controller for all system accounts.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Create User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
             <div className="text-center p-10 text-slate-500">Loading accounts...</div>
        ) : users.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No active accounts visible.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email (Identifier)</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">System Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{user.email || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-100 text-indigo-700">
                      {user.role || 'USER'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${user.isActive !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {user.isActive !== false ? 'ACTIVE' : 'DISABLED'}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                     <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Settings2 className="w-4 h-4" /></button>
                     <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
