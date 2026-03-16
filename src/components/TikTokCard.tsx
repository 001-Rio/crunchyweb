'use client';

interface TikTokProps {
  username: string;
  followers: string | number;
  likes: string | number;
  isLive: boolean;
  avatarUrl: string;
}

export default function TikTokCard({ username, followers, likes, isLive, avatarUrl }: TikTokProps) {
  return (
    <div className="relative group w-80 bg-white/[0.03] border border-white/10 backdrop-blur-md p-6 transition-all hover:border-sparkle-red/50">
      <div className="absolute -top-3 -right-3 text-2xl group-hover:rotate-12 transition-transform">🎭</div>

      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full border-2 border-sparkle-red p-1">
          <div className="w-full h-full bg-gray-800 rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src={avatarUrl} 
              alt={username} 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=JM&background=1f2937&color=fff"; }}
            />
          </div>
          <span className={`absolute -bottom-1 -right-1 flex h-4 w-4`}>
            {isLive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sparkle-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sparkle-red"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gray-500"></span>
            )}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-lg leading-tight">@{username}</h3>
          <p className={`text-[10px] font-mono font-bold tracking-widest uppercase ${isLive ? 'text-sparkle-red' : 'text-gray-500'}`}>
            {isLive ? '• Live Now' : '• Aired'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Followers</p>
          <p className="text-2xl font-black font-mono">{followers || '0'}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Total Likes</p>
          <p className="text-2xl font-black font-mono">{likes || '0'}</p>
        </div>
      </div>

      <a href={`https://www.tiktok.com/@${username}`} target="_blank" rel="noopener noreferrer" className="block mt-6 w-full text-center bg-sparkle-red text-white text-xs py-3 font-bold hover:bg-red-700 transition-all uppercase tracking-widest">
        Watch Theater
      </a>
    </div>
  );
}