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
    videoCount: "0", 
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
        videoCount: data.tiktokLikes || "0",
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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-sparkle-black text-sparkle-white p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sparkle-red/10 blur-[150px] rounded-full -z-10" />
      
      <div className="relative z-10 text-center w-full max-w-5xl">
        <h2 className="text-sparkle-red font-mono tracking-[0.3em] text-sm mb-2 uppercase">
          Welcome to the Stage
        </h2>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(230,25,46,0.3)]">
          CRUNCHY<span className="text-sparkle-red italic">VERSE</span>
        </h1>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left">
          
          {/* KOLOM KIRI: Profile Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <TikTokCard 
              username={ttData.username} 
              followers={ttData.followers} 
              likes={ttData.videoCount} 
              isLive={ttData.isLive}
              avatarUrl="/foto-jobet.jpeg" 
            />
            {/* Announcement Board muncul di sini */}
            {news && <Announcement message={news} />}
          </div>
          
          {/* KOLOM KANAN: Stage Section */}
          <div className="border-l border-white/10 pl-8 space-y-8">
            <a 
              href="https://discord.gg/tbKEhb2UT8" 
              target="_blank" 
              className="group block"
            >
              <h4 className="text-sparkle-red font-bold text-sm mb-2 uppercase tracking-widest group-hover:animate-pulse">
                Enter the Theater
              </h4>
              <p className="text-2xl md:text-3xl font-black italic leading-tight group-hover:text-sparkle-red transition-colors">
                JOIN CRUNCHYVERSE <br /> DISCORD SERVER →
              </p>
            </a>

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