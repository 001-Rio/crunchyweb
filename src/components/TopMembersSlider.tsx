'use client';
import { useState, useEffect } from 'react';

interface Actor {
  discordId: string;
  name: string;
  role: string;
  banner: string;
  activity: string;
}

const ActorCard = ({ actor, size = "md", profiles }: { actor: Actor, size?: string, profiles: any[] }) => {
  const profile = profiles.find(p => p.id === actor.discordId);
  const pfp = profile?.avatar || `https://ui-avatars.com/api/?name=${actor.name}&background=e6192e&color=fff`;

  return (
    <div className={`relative group overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl transition-all duration-500 hover:border-sparkle-red/50 ${
      size === "lg" ? "w-56 p-6" : size === "md" ? "w-40 p-4" : "w-32 p-3"
    }`}>
      {/* Texture Background */}
      <div 
        className="absolute inset-0 opacity-[0.08] grayscale group-hover:grayscale-0 group-hover:opacity-[0.15] transition-all duration-700 -z-10"
        style={{ backgroundImage: `url(${actor.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      <div className="flex flex-col items-center text-center">
        {/* Avatar Area */}
        <div className={`${size === "lg" ? "w-20 h-20" : size === "md" ? "w-14 h-14" : "w-10 h-10"} rounded-full border-2 border-sparkle-red/30 p-1 mb-4 transform group-hover:scale-110 transition-transform overflow-hidden shadow-xl`}>
          <img src={pfp} referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover bg-sparkle-gray" alt={actor.name} />
        </div>

        {/* Name - Readable Scale */}
        <h4 className={`${size === "lg" ? "text-xl" : size === "md" ? "text-sm" : "text-[11px]"} font-black tracking-tighter italic uppercase text-white truncate w-full`}>
          {actor.name}
        </h4>
        
        {/* Role Badge */}
        <span className="text-[8px] px-2 py-0.5 bg-sparkle-red/10 border border-sparkle-red/20 text-sparkle-red font-black uppercase tracking-widest mt-1 mb-3">
          {actor.role}
        </span>

        {/* Status Activity */}
        <div className="w-full pt-2 border-t border-white/5">
          <p className={`${size === "lg" ? "text-xs" : "text-[10px]"} font-mono text-gray-500 uppercase tracking-tighter italic leading-tight group-hover:text-white transition-colors line-clamp-1`}>
            {actor.activity || "Acting"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TopActorsHierarchy() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/api/discord').then(res => res.json()).then(data => setProfiles(data.modProfiles || []));
  }, []);

  const owner = { discordId: "588988763204616214", name: "CrunchyWeeb", role: "THEATER EQUILIBIRIUM", banner: "/banners/o.jpg", activity: "SERVER CREATOR" };
  
  const modServer = [
    { discordId: "845266349723090965", name: "Idead", role: "BOT MANAGER", banner: "/b1.jpg", activity: "CREATOR OF SILENCE" },
    { discordId: "661135501226672129", name: "Sim", role: "SERVER ADMIN", banner: "/b2.jpg", activity: "CREATOR OF WEBSITE" },
    { discordId: "820154491654504458", name: "Fuzu", role: "SERVER MANAGER", banner: "/b3.jpg", activity: "MANAGEMENT OPERATOR" },
    { discordId: "1041661934472282112", name: "William", role: "SERVER SECURITY", banner: "/b4.jpg", activity: "SERVER PROTECTOR" },
    { discordId: "1387294987452153856", name: "Nopi", role: "INFORMATION CARRIER", banner: "/b1.jpg", activity: "UP-TO-DATE INFORMANT" },
  ];

  const modStream = [
    { discordId: "1271433700051128405", name: "EvaLiu", role: "STREAM MOD", banner: "/b1.jpg", activity: "MODERATING MUSIC" },
    { discordId: "331053654318776320", name: "Arinn", role: "STREAM MOD", banner: "/b2.jpg", activity: "STREAM MONITOR" },
    { discordId: "656417229545668628", name: "artx", role: "STREAM MOD", banner: "/b3.jpg", activity: "INACT" },
    { discordId: "1403257010379554897", name: "Mr Basty", role: "STREAM MOD", banner: "/b4.jpg", activity: "STORY MONITOR" },
    { discordId: "810407347876790315", name: "Nazreal", role: "STREAM MOD", banner: "/b3.jpg", activity: "MOOD BOOSTER" },
    { discordId: "1076693622528938006", name: "Reiko", role: "STREAM MOD", banner: "/b4.jpg", activity: "INACT" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl space-y-12 py-8">
      {/* Title - Compact & Clean */}
      <div className="text-center mb-4">
        <h2 className="text-sparkle-red font-mono tracking-[0.4em] text-[10px] uppercase mb-1">Backstage Credits</h2>
        <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">
          THE <span className="text-white/20">HIERARCHY</span>
        </h3>
      </div>

      <div className="flex flex-col items-center gap-10 w-full px-4">
        {/* Tier 1 */}
        <ActorCard actor={owner} size="lg" profiles={profiles} />
        
        {/* Tier 2 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full justify-items-center">
          {modServer.map((m, i) => <ActorCard key={i} actor={m} size="md" profiles={profiles} />)}
        </div>

        {/* Tier 3 */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 w-full justify-items-center">
          {modStream.map((m, i) => <ActorCard key={i} actor={m} size="sm" profiles={profiles} />)}
        </div>
      </div>
    </div>
  );
}