import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Plus, BookOpen, Layers } from 'lucide-react';

export default function Academic() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/academic/classes')
      .then(res => setClasses(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Academic Infrastructure</h1>
          <p className="text-sm text-slate-500 mt-1">Configure Classes, Sections, and Subjects mappings.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors self-start sm:self-auto w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#007A6E]" /> Managed Classes
            </h3>
          </div>
          <div className="p-4 space-y-3 min-h-[300px]">
            {loading ? <p className="text-sm text-slate-500">Loading...</p> : classes.length === 0 ? <p className="text-sm text-slate-500">No classes configured.</p> : null}
            {classes.map((cls) => (
              <div key={cls.id} className="p-4 rounded-xl border border-slate-200 hover:border-[#007A6E]/50 transition-colors bg-slate-50">
                <div className="font-bold text-slate-800">{cls.name}</div>
                <div className="text-sm text-slate-500 mt-1">Level: {cls.level} | Capacity: {cls.capacity || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <BookOpen className="w-5 h-5 text-indigo-600" /> Syllabus &amp; Subjects
            </h3>
          </div>
          <div className="p-6 text-center text-sm text-slate-500">
             Select a class to map subjects array bindings dynamically from the API schema.
          </div>
        </div>
      </div>
    </div>
  );
}
