'use client';
import { useEffect, useState } from 'react';
import TikTokCard from './TikTokCard';
import DiscordTheater from './DiscordTheater';

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

  useEffect(() => {
    fetch('/api/discord')
      .then(res => res.json())
      .then(data => {
        setStats({
          members: data.kerupukCount || 0,
          online: data.onlineCount || 0,
          voiceData: data.voiceActivity || []
        });

        setTtData({
          username: "jobetmaritoas",
          followers: data.tiktokFollowers,
          videoCount: data.tiktokLikes,
          isLive: true
        });
      })
      .catch(err => console.error("Sync Error:", err));
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-sparkle-black text-sparkle-white p-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sparkle-red/10 blur-[150px] rounded-full -z-10" />
      
      <div className="relative z-10 text-center w-full max-w-5xl">
        <h2 className="text-sparkle-red font-mono tracking-[0.3em] text-sm mb-2 uppercase">
          Welcome to the Stage
        </h2>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(230,25,46,0.3)]">
          CRUNCHY<span className="text-sparkle-red italic">VERSE</span>
        </h1>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left">
          <div className="flex justify-center md:justify-end">
            <TikTokCard 
              username={ttData.username} 
              followers={ttData.followers} 
              likes={ttData.videoCount} 
              isLive={ttData.isLive}
              avatarUrl="/foto-jobet.jpeg" 
            />
          </div>
          
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