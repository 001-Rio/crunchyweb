'use client';

export default function Announcement({ message }: { message: string }) {
  return (
    <div className="mt-6 w-80 bg-white/[0.02] border border-dashed border-white/10 p-4 relative group">
      {/* Label Kecil */}
      <div className="absolute -top-2 left-4 bg-sparkle-red px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white shadow-lg">
        Backstage News
      </div>
      
      {/* Pesan */}
      <p className="text-xs text-gray-400 font-mono italic leading-relaxed group-hover:text-white transition-colors">
        "{message}"
      </p>

      {/* Dekorasi Pojok */}
      <div className="absolute bottom-1 right-1 opacity-10 group-hover:opacity-30 transition-opacity">
        📢
      </div>
    </div>
  );
}