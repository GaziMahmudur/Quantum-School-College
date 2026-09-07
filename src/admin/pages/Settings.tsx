import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { Settings, Save } from 'lucide-react';

export default function InstitutionSettings() {
  const [data, setData] = useState<any>({ name: '', address: '', contactEmail: '', mission: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApi('/institution')
      .then(res => {
        if(res.data) setData(res.data);
      })
      .catch((e) => console.log('Institution api 404 or missing, creating default settings placeholder', e))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetchApi('/institution', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      alert('Settings updated globally!');
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-10 text-slate-500">Loading settings schema...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#0b2545] flex items-center gap-2"><Settings className="w-6 h-6"/> Global Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure parameters injected down to the public marketing site.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Institution Name</label>
              <input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007A6E]/30 focus:border-[#007A6E]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Contact Email</label>
              <input type="email" value={data.contactEmail || ''} onChange={e => setData({...data, contactEmail: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007A6E]/30 focus:border-[#007A6E]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Address / Campus Location</label>
              <input value={data.address || ''} onChange={e => setData({...data, address: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007A6E]/30 focus:border-[#007A6E]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Principal's Name</label>
              <input value={data.principalName || ''} onChange={e => setData({...data, principalName: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007A6E]/30 focus:border-[#007A6E]" />
            </div>
         </div>
         
         <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase">Mission Statement</label>
            <textarea rows={3} value={data.mission || ''} onChange={e => setData({...data, mission: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007A6E]/30 focus:border-[#007A6E]" />
         </div>

         <div className="pt-4 border-t border-slate-200">
           <button type="submit" disabled={saving} className="bg-[#007A6E] hover:bg-[#00655b] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow flex items-center gap-2">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Deploy Global Configuration'}
           </button>
         </div>
      </form>
    </div>
  );
}
