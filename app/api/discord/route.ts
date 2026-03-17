import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const GUILD_ID = "1403255548698300416";
  const CH_FOLLOWER_ID = "1426350137592119458";
  const CH_LIKES_ID = "1426350327577313411";
  const CH_ANNOUNCEMENT_ID = "1483040246739239065";

  const TARGET_IDS = [
    "588988763204616214", "845266349723090965", "661135501226672129", 
    "820154491654504458", "1041661934472282112", "1271433700051128405", 
    "331053654318776320", "656417229545668628", "1403257010379554897", 
    "810407347876790315", "1387294987452153856", "1076693622528938006"
  ];

  if (!BOT_TOKEN) return NextResponse.json({ error: 'Token missing' }, { status: 500 });

  try {
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

    const modProfiles = await Promise.all(TARGET_IDS.map(async (id) => {
      const res = await fetch(`https://discord.com/api/v10/users/${id}`, fetchOptions);
      if (!res.ok) return null;
      const user = await res.json();
      const isGif = user.avatar?.startsWith('a_');
      return {
        id: user.id,
        avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${isGif ? 'gif' : 'png'}?size=256` : null
      };
    }));

    const guild = await guildRes.json();
    const channels = await channelsRes.json();
    const widget = await widgetRes.json();
    const announcements = announceRes.ok ? await announceRes.json() : [];

    const getCountFromChannel = (id: string) => {
      const channel = Array.isArray(channels) ? channels.find((c: any) => c.id === id) : null;
      const match = channel?.name.match(/\d+(\.\d+)?K?/);
      return match ? match[0] : "0";
    };

    const voiceData = (widget.channels || [])
      .filter((ch: any) => (widget.members || []).some((m: any) => m.channel_id === ch.id))
      .map((ch: any) => ({
        name: ch.name,
        users: widget.members
          .filter((m: any) => m.channel_id === ch.id)
          .map((m: any) => ({ id: m.id, username: m.username, avatar: m.avatar_url }))
      }));

    return NextResponse.json({
      kerupukCount: guild.approximate_member_count,
      onlineCount: guild.approximate_presence_count,
      tiktokFollowers: getCountFromChannel(CH_FOLLOWER_ID),
      tiktokLikes: getCountFromChannel(CH_LIKES_ID),
      voiceActivity: voiceData,
      modProfiles: modProfiles.filter(Boolean),
      latestNews: announcements[0]?.content || ""
    });
  } catch (error) {
    return NextResponse.json({ error: 'Sync Failed' }, { status: 500 });
  }
}