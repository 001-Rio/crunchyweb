'use client';

export default function StageGallery() {
  // Contoh data foto (bisa diganti dengan path foto aslimu)
  const highlights = [
    { id: 1, title: "???", date: "???" },
    { id: 2, title: "???", date: "???" },
    { id: 3, title: "???", date: "JAN 2026" },
    { id: 4, title: "???", date: "DEC 2025" },
  ];

  return (
    <section className="relative h-screen w-full bg-sparkle-black overflow-hidden flex items-center justify-center snap-start">
      
      {/* BACKGROUND: Foto-foto dengan opacity rendah & fade ke atas */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 gap-4 opacity-[0.08] blur-[2px] h-full transform -translate-y-12 scale-110">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-800 w-full h-80 rounded-lg animate-pulse"
              style={{ 
                backgroundImage: `url('/api/placeholder/400/600')`, // Ganti dengan foto aslimu
                backgroundSize: 'cover',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        {/* Overlay Fade ke Atas agar menyatu dengan background hitam */}
        <div className="absolute inset-0 bg-gradient-to-t from-sparkle-black via-transparent to-sparkle-black" />
      </div>

      {/* CONTENT: Galeri Utama */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="text-sparkle-red font-mono tracking-[0.4em] text-xs uppercase mb-2">Theater Lethal</h2>
          <h3 className="text-5xl font-black italic tracking-tighter uppercase">Event <span className="text-white/20">Archive</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] bg-white/[0.03] border border-white/10 p-4 transition-all hover:border-sparkle-red/50 hover:-translate-y-2">
              <div className="h-full border border-dashed border-white/10 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-sparkle-red mb-1">{item.date}</span>
                <h4 className="font-black uppercase tracking-widest text-sm leading-tight group-hover:text-sparkle-red transition-colors">
                  {item.title}
                </h4>
              </div>
              {/* Efek Hover Glow */}
              <div className="absolute inset-0 bg-sparkle-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Dekorasi Pojok */}
      <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/10 uppercase tracking-[1em] rotate-90 origin-right">
        Crunchyverse Archive v.01
      </div>
    </section>
  );
}