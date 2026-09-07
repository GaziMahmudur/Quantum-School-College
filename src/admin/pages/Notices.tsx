import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Plus, BellRing, Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function Notices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/notices')
      .then(res => setNotices(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await fetchApi(`/notices/${id}`, { method: 'DELETE' });
        setNotices(prev => prev.filter(n => n.id !== id));
      } catch (err: any) {
        alert(err.message || 'Error occurred');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Notices & Circulars</h1>
          <p className="text-sm text-slate-500 mt-1">Publish operational updates across the web portals.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Issue Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
             <div className="text-center p-10 text-slate-500">Loading notices...</div>
          ) : notices.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No active notices found in database.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Notice Board Details</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg shrink-0 mt-1">
                          <BellRing className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{notice.title}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-md line-clamp-2">{notice.content}</p>
                          <div className="flex gap-2 mt-2">
                             <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{notice.category}</span>
                             <span className="text-[10px] text-slate-400 py-0.5">{new Date(notice.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-700">
                        {notice.targetAudience}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                       <button onClick={() => handleDelete(notice.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
