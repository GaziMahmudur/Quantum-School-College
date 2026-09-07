import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAdd, setShowAdd] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', studentId: '', email: '', password: '' });

  const loadData = () => {
    fetchApi('/students')
      .then(res => setStudents(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  
  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/students', { method: 'POST', body: JSON.stringify(newStudent) });
      alert('Created');
      setShowAdd(false);
      loadData();
    } catch(err:any) {
      alert(err.message);
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to deactivate this student?")) {
      try {
        await fetchApi(`/students/${id}`, { method: 'DELETE' });
        setStudents(prev => prev.filter(s => s.id !== id));
      } catch (err: any) {
        alert(err.message || 'Error occurred');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Student Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage enrollments, statuses, and profiles.</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> {showAdd ? 'Close Form' : 'Add Student'}
        </button>
      </div>
      
      {showAdd && (
         <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-slate-800">New Enrollment</h3>
            <div className="grid grid-cols-2 gap-4">
              <input required value={newStudent.firstName} onChange={e => setNewStudent({...newStudent, firstName: e.target.value})} placeholder="First Name" className="border p-2 rounded" />
              <input required value={newStudent.lastName} onChange={e => setNewStudent({...newStudent, lastName: e.target.value})} placeholder="Last Name" className="border p-2 rounded" />
              <input required value={newStudent.studentId} onChange={e => setNewStudent({...newStudent, studentId: e.target.value})} placeholder="STU-ID" className="border p-2 rounded" />
              <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} placeholder="Email (Login)" className="border p-2 rounded" />
              <input required type="password" value={newStudent.password} onChange={e => setNewStudent({...newStudent, password: e.target.value})} placeholder="Initial Password" className="border p-2 rounded" />
            </div>
            <button type="submit" className="bg-[#007A6E] text-white py-2 rounded-lg font-bold">Admit Student</button>
         </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or Email..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#007A6E]/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
             <div className="text-center p-10 text-slate-500">Loading directory...</div>
          ) : students.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No student records found in database.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Profile</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll & Class</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guardian Data</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {student.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{student.studentId} • {student.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">Roll: {student.rollNumber || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        student.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700 font-medium">{student.guardianName || 'N/A'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{student.guardianPhone || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                       <button onClick={() => handleDelete(student.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
