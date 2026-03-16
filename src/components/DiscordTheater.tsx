'use client';

interface User {
  username: string;
  avatar: string;
  status: string;
}

interface VoiceChannel {
  name: string;
  users: User[];
}

interface TheaterProps {
  online: number;
  kerupuk: number;
  voiceActivity: VoiceChannel[];
}

export default function DiscordTheater({ online, kerupuk, voiceActivity }: TheaterProps) {
  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
        <div className="bg-white/[0.02] p-4 border-l-2 border-gray-700">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Total Kerupuk</p>
          <p className="text-3xl font-black font-mono tracking-tighter">{kerupuk}</p>
        </div>
        <div className="bg-white/[0.02] p-4 border-l-2 border-green-500/50">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Online Now</p>
          <p className="text-3xl font-black font-mono tracking-tighter text-green-500">{online}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sparkle-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sparkle-red"></span>
          </div>
          <h5 className="text-xs text-sparkle-red font-black uppercase tracking-[0.3em]">Live Activity</h5>
        </div>
        
        {voiceActivity && voiceActivity.length > 0 ? (
          voiceActivity.map((vc, i) => (
            <div key={i} className="group bg-gradient-to-r from-white/[0.03] to-transparent border-l border-white/10 p-5 transition-all hover:border-sparkle-red/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-black italic text-gray-300 group-hover:text-white transition-colors">
                  🔊 {vc.name}
                </span>
                <span className="text-[8px] font-mono text-sparkle-red border border-sparkle-red/20 px-2 py-0.5 rounded-full">
                  ACTOR ON STAGE
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {vc.users.map((user, idx) => (
                  <div key={idx} className="relative group/user">
                    <div className={`p-0.5 rounded-full border-2 ${
                      user.status === 'online' ? 'border-green-500' : 
                      user.status === 'dnd' ? 'border-red-500' : 'border-yellow-500'
                    } transition-all group-hover/user:scale-110`}>
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="w-10 h-10 rounded-full bg-gray-800"
                      />
                    </div>
                    
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-sparkle-red text-white px-3 py-1 text-[10px] font-black uppercase italic opacity-0 group-hover/user:opacity-100 transition-all z-50 pointer-events-none whitespace-nowrap shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                      {user.username}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 border border-dashed border-white/5 text-center bg-white/[0.01]">
            <p className="text-[10px] text-gray-600 font-mono italic uppercase tracking-widest">
              The Theater is currently silent...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}