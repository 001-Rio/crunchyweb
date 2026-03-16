import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const GUILD_ID = "1403255548698300416";
  
  const CH_FOLLOWER_ID = "1426350137592119458"; 
  const CH_LIKES_ID = "1426350327577313411";    
  const CH_ANNOUNCEMENT_ID = "1483040246739239065";
  

  // Pastikan token ada sebelum lanjut
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'Token missing' }, { status: 500 });
  }

  try {
    // Tambahkan { cache: 'no-store' } agar data beneran Live (CI/CD friendly)
    const fetchOptions = {
      headers: { Authorization: `Bot ${BOT_TOKEN}` },
      cache: 'no-store' as RequestCache
    };

    const [guildRes, channelsRes, widgetRes, announceRes] = await Promise.all([
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}?with_counts=true`, fetchOptions),
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/channels`, fetchOptions),
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/widget.json`, { cache: 'no-store' }),
      fetch(`https://discord.com/api/v10/channels/${CH_ANNOUNCEMENT_ID}/messages?limit=1`, fetchOptions)
    ]);

    // Parsing data dengan fallback (biar kalau satu gagal, yang lain tetap jalan)
    const guild = guildRes.ok ? await guildRes.json() : {};
    const channelsData = channelsRes.ok ? await channelsRes.json() : [];
    const widget = widgetRes.ok ? await widgetRes.json() : { channels: [], members: [] };
    const announcements = announceRes.ok ? await announceRes.json() : [];
    console.log("ISI CHAT DARI DISCORD:", announcements);

    // Pastikan 'channelsData' beneran Array sebelum pakai .find()
    const channels = Array.isArray(channelsData) ? channelsData : [];

    // Helper: Ambil angka dari nama channel (TikTok Stats)
    const getCountFromChannel = (channelId: string) => {
      const channel = channels.find((c: any) => c.id === channelId);
      if (!channel) return "0";
      const match = channel.name.match(/\d+(\.\d+)?K?/);
      return match ? match[0] : "0";
    };

    // Helper: Ambil berita terakhir
    const latestAnnounce = announcements[0];
let latestMsg = ""; // Default kosong agar komponen bisa ngumpet

if (latestAnnounce) {
  const postTime = new Date(latestAnnounce.timestamp).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000; // 86.400.000 ms

  // Jika umur pesan masih di bawah 24 jam, tampilkan isinya
  if (now - postTime < twentyFourHours) {
    latestMsg = latestAnnounce.content;
  }
}
    // Logika Voice Activity (lebih bersih & aman)
    const voiceData = (widget.channels || [])
      .filter((ch: any) => (widget.members || []).some((m: any) => m.channel_id === ch.id))
      .map((ch: any) => ({
        name: ch.name,
        users: widget.members
          .filter((m: any) => m.channel_id === ch.id)
          .map((m: any) => ({
            username: m.username,
            avatar: m.avatar_url,
            status: m.status
          }))
      }));

    return NextResponse.json({
      kerupukCount: guild.approximate_member_count,
      onlineCount: guild.approximate_presence_count,
      tiktokFollowers: getCountFromChannel(CH_FOLLOWER_ID),
      tiktokLikes: getCountFromChannel(CH_LIKES_ID),
      voiceActivity: voiceData,
      latestNews: latestMsg
    });

  } catch (error) {
  console.error("DEBUG ERROR DISCORD:", error); // Lihat ini di terminal!
  return NextResponse.json({ 
    error: 'Sync Failed', 
    message: error instanceof Error ? error.message : "Unknown Error" 
  }, { status: 500 });
}
}