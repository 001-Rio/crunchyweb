'use client';
import { useEffect, useState } from 'react';
import TikTokCard from './TikTokCard';
import DiscordTheater from './DiscordTheater';
import Announcement from './Announcement';

export default function Hero() {
  const [stats, setStats] = useState({ 
    members: 0, 
    online: 0, 
    voiceData: [] 
  });
  
  const [ttData, setTtData] = useState({ 
    username: "jobetmaritoas", 
    followers: "0", 
    likes: "0", 
    isLive: false
  });

  const [news, setNews] = useState("");

  useEffect(() => {
  // 1. Fungsi sinkronisasi data
  const syncStageData = async () => {
    try {
      // Tambahkan timestamp (?t=...) biar browser dipaksa ambil data baru, bukan cache
      const res = await fetch(`/api/discord?t=${Date.now()}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // Update Statistik Discord
      setStats({
        members: data.kerupukCount || 0,
        online: data.onlineCount || 0,
        voiceData: data.voiceActivity || []
      });

      // Update Data TikTok (Gunakan functional update biar state lain gak hilang)
      setTtData(prev => ({
        ...prev,
        username: "jobetmaritoas",
        followers: data.tiktokFollowers || "0",
        likes: data.tiktokLikes || "0",
        isLive: data.isLive || false // Kalau nanti ada API check live beneran
      }));

      // Update Berita Backstage
      setNews(data.latestNews);

    } catch (err) {
      console.error("🎭 Theater Sync Error:", err);
    }
  };

  // 2. Jalankan langsung saat halaman dibuka
  syncStageData();

  // 3. Pasang Interval (Cek setiap 30 detik)
  const interval = setInterval(syncStageData, 30000);

  // 4. Cleanup: Hapus interval kalau pindah halaman biar gak memory leak
  return () => clearInterval(interval);
}, []);

  // Modifikasi bagian return di Hero.tsx
return (
  <section className="relative min-h-screen flex flex-col items-center justify-center bg-sparkle-black text-white p-6 overflow-hidden snap-start">
    {/* 1. Grid & Grainy Texture Background */}
    <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sparkle-black/50 to-sparkle-black pointer-events-none" />

    {/* 2. Spotlight Glows */}
    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-sparkle-red/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full" />

    <div className="relative z-10 w-full max-w-6xl">
      {/* 3. Refined Typography */}
      <div className="flex flex-col items-center justify-center w-full">
  <h2 className="text-sparkle-red font-mono tracking-[0.3em] text-sm mb-2 uppercase">
    Welcome to the Stage
  </h2>
  
  <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(230,25,46,0.3)] inline-flex items-center">
    CRUNCHY
    <span className="text-sparkle-red ml-2">VERSE</span> 
    {/* Catatan: 'italic' dihapus agar tidak miring ke kanan, 
        tapi kalau mau tetap miring, tambahkan lagi class 'italic' nya */}
  </h1>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Kolom Kiri: TikTok & News */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-end">
          <div className="transform hover:-translate-y-2 transition-transform duration-500">
             <TikTokCard {...ttData} avatarUrl="/foto-jobet.jpeg" />
          </div>
          {news && <Announcement message={news} />}
        </div>

        {/* Kolom Kanan: Discord Theater */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 p-8 backdrop-blur-2xl rounded-2xl shadow-2xl">
           <DiscordTheater 
              online={stats.online} 
              kerupuk={stats.members} 
              voiceActivity={stats.voiceData} 
            />
        </div>
      </div>
    </div>
  </section>
);
}