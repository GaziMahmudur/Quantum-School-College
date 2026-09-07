import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { FileText, Plus, ChevronRight } from 'lucide-react';

export default function Exams() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/exams')
      .then(res => setExams(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const [resultForm, setResultForm] = useState({ studentId: '', examId: '', subjectId: '', marksObtained: '', totalMarks: '100' });
  const [publishing, setPublishing] = useState(false);

  const handleResultSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    try {
      await fetchApi('/results', {
        method: 'POST',
        body: JSON.stringify({
          ...resultForm,
          marksObtained: parseFloat(resultForm.marksObtained),
          totalMarks: parseFloat(resultForm.totalMarks)
        })
      });
      alert('Marks persisted securely via Backend Engine GPA rules.');
      setResultForm({...resultForm, marksObtained: ''});
    } catch(err:any) {
      alert(err.message || 'Error saving result');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Exam Management Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">Configure institutional assessment periods securely.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Declare Exam Session
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
           <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
             <h3 className="font-bold text-slate-800">Declared Assessment Windows</h3>
           </div>
           
           <div className="p-4 space-y-3">
              {loading ? <p className="text-sm text-slate-500">Connecting...</p> : exams.length === 0 ? <p className="text-sm text-slate-500">No exams configured in database schema.</p> : null}
              {exams.map((ex) => (
                <div key={ex.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between hover:border-[#007A6E]/50 transition-colors cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800 text-sm leading-tight">{ex.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">Year: {ex.academicYear}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              ))}
           </div>
         </div>
         
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
               <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-2"><FileText className="w-5 h-5"/> Results Publisher</h3>
               <p className="text-xs text-indigo-700 leading-relaxed mb-4">
                 Access the automated Results API to input subject marks. The backend Engine will natively parse the raw numbers, converting them to Letter Grades & GPAs.
               </p>
               <form onSubmit={handleResultSave} className="space-y-3">
                  <input required placeholder="Student DB ID" value={resultForm.studentId} onChange={e => setResultForm({...resultForm, studentId: e.target.value})} className="w-full text-sm border p-2 rounded focus:ring-indigo-500" />
                  <input required placeholder="Exam DB ID" value={resultForm.examId} onChange={e => setResultForm({...resultForm, examId: e.target.value})} className="w-full text-sm border p-2 rounded" />
                  <input required placeholder="Subject DB ID" value={resultForm.subjectId} onChange={e => setResultForm({...resultForm, subjectId: e.target.value})} className="w-full text-sm border p-2 rounded" />
                  
                  <div className="flex gap-2">
                     <input required type="number" placeholder="Marks" value={resultForm.marksObtained} onChange={e => setResultForm({...resultForm, marksObtained: e.target.value})} className="w-1/2 text-sm border p-2 rounded" />
                     <input required type="number" placeholder="Total (100)" value={resultForm.totalMarks} onChange={e => setResultForm({...resultForm, totalMarks: e.target.value})} className="w-1/2 text-sm border p-2 rounded" />
                  </div>
                  <button type="submit" disabled={publishing} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 mt-2 text-sm font-semibold shadow disabled:opacity-50">
                      {publishing ? 'Publishing...' : 'Enter Final Marks'}
                  </button>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
}
