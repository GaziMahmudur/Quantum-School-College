import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import { FileHeart, Plus, Download, Trash2 } from 'lucide-react';

export default function GalleryFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchApi('/events') // We can map images to eventGallery types later, or fetch from fileStorage if endpoint exists
      .then(res => setFiles(res.data?.filter((e:any) => e.imageUrl) || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!fileInput) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('document', fileInput);

    try {
      const res = await fetchApi('/files/upload', {
        method: 'POST',
        body: formData
      });
      alert(`File uploaded securely! URL: ${res.data?.url}`);
      setFileInput(null);
      // reload files logic here
    } catch(err: any) {
      alert(err.message || 'File upload constraints caught in backend');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Media & Files</h1>
          <p className="text-sm text-slate-500 mt-1">Local upload center hitting `/api/files/upload` via Multer.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
          <form onSubmit={handleUpload} className="space-y-4">
             <label className="block text-sm font-bold text-slate-700">Upload New Attachment</label>
             <input type="file" onChange={(e) => setFileInput(e.target.files?.[0] || null)} className="w-full text-sm border border-slate-300 p-2 rounded-lg" />
             <button type="submit" disabled={uploading || !fileInput} className="w-full flex items-center justify-center gap-2 bg-[#007A6E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-[#00655b] transition-colors disabled:opacity-50">
               <Plus className="w-4 h-4"/> {uploading ? 'Pushing binary...' : 'Secure Upload Drop'}
             </button>
             <p className="text-xs text-slate-500">System securely pipes this to `/uploads/` root.</p>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
             <div className="text-center p-10 text-slate-500">Loading gallery storage...</div>
          ) : files.length === 0 ? (
             <div className="text-center p-10 text-slate-500">No images or attachments detected in database indexing.</div>
          ) : (
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
               {files.map((file, idx) => (
                 <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden group relative">
                    <img src={file.imageUrl} alt="attachment" className="w-full h-32 object-cover" />
                    <div className="p-3 bg-slate-50 flex items-center justify-between">
                       <span className="text-xs font-semibold text-slate-700 truncate">{file.title}</span>
                       <button className="text-rose-500 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
