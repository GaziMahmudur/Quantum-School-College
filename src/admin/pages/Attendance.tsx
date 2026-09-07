import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Attendance() {
  const [logs, setLogs] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'log' | 'manual'>('log');

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    setLoading(true);
    fetchApi('/attendance')
      .then(res => setLogs(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const loadStudents = () => {
    fetchApi('/students').then(res => setStudents(res.data || []));
  };

  const markStudent = async (studentId: string, status: string) => {
    try {
       await fetchApi('/attendance', {
         method: 'POST',
         body: JSON.stringify({
           date: new Date(date).toISOString(),
           studentId,
           status
         })
       });
       alert('Saved');
    } catch (e: any) {
       alert(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Attendance Registry</h1>
          <p className="text-sm text-slate-500 mt-1">Review terminal logs and RFID capture arrays.</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => { setView('log'); loadLogs(); }} className={`px-4 py-2 ${view === 'log' ? 'bg-[#007A6E] text-white' : 'bg-slate-200'} rounded-lg font-bold text-sm`}>Logs</button>
           <button onClick={() => { setView('manual'); loadStudents(); }} className={`px-4 py-2 ${view === 'manual' ? 'bg-[#007A6E] text-white' : 'bg-slate-200'} rounded-lg font-bold text-sm`}>Manual Entry</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-[400px]">
          
          {view === 'manual' ? (
             <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded" />
                </div>
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500">Student Name</th>
                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500">Mark Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {students.map(s => (
                         <tr key={s.id} className="border-b">
                            <td className="px-6 py-3 font-semibold">{s.firstName} {s.lastName} (Roll: {s.rollNumber})</td>
                            <td className="px-6 py-3 space-x-2">
                               <button onClick={() => markStudent(s.id, 'PRESENT')} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">Present</button>
                               <button onClick={() => markStudent(s.id, 'ABSENT')} className="px-3 py-1 bg-rose-100 text-rose-800 rounded font-bold text-xs">Absent</button>
                               <button onClick={() => markStudent(s.id, 'LATE')} className="px-3 py-1 bg-amber-100 text-amber-800 rounded font-bold text-xs">Late</button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          ) : (
          /* Logs View */
          loading ? (
             <div className="text-center p-10 text-slate-500">Loading daily registers...</div>
          ) : logs.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No attendance records documented on current schemas.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Logged</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Matrix</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gate Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Recorder Auth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-slate-700">
                      {new Date(log.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {log.student?.firstName || 'UNKNOWN ENTITY'}
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'PRESENT' && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"><CheckCircle className="w-3 h-3"/> PRESENT</span>}
                      {log.status === 'ABSENT' && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700"><XCircle className="w-3 h-3"/> ABSENT</span>}
                      {log.status === 'LATE' && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"><Clock className="w-3 h-3"/> LATE</span>}
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-500">
                       <span className="font-mono bg-slate-100 px-2 py-1 rounded">{log.recordedBy || 'SYSTEM'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          )}
        </div>
      </div>
    </div>
  );
}
