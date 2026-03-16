import { NextResponse } from 'next/server';

export async function GET() {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const GUILD_ID = "1403255548698300416";
  
  const CH_FOLLOWER_ID = "1426350137592119458"; 
  const CH_LIKES_ID = "1426350327577313411";    

  try {
    const [guildRes, channelsRes, widgetRes] = await Promise.all([
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}?with_counts=true`, { 
        headers: { Authorization: `Bot ${BOT_TOKEN}` } 
      }),
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/channels`, { 
        headers: { Authorization: `Bot ${BOT_TOKEN}` } 
      }),
      fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/widget.json`)
    ]);

    const guild = await guildRes.json();
    const channels = await channelsRes.json();
    const widget = await widgetRes.json();

    const getCountFromChannel = (channelId: string) => {
      const channel = channels.find((c: any) => c.id === channelId);
      if (!channel) return "0";
      const match = channel.name.match(/\d+(\.\d+)?K?/);
      return match ? match[0] : "0";
    };

    const voiceData = widget.channels
      ? widget.channels
          .filter((ch: any) => widget.members.some((m: any) => m.channel_id === ch.id))
          .map((ch: any) => ({
            name: ch.name,
            users: widget.members
              .filter((m: any) => m.channel_id === ch.id)
              .map((m: any) => ({
                username: m.username,
                avatar: m.avatar_url,
                status: m.status
              }))
          }))
      : [];

    return NextResponse.json({
      kerupukCount: guild.approximate_member_count || 0,
      onlineCount: guild.approximate_presence_count || 0,
      
      tiktokFollowers: getCountFromChannel(CH_FOLLOWER_ID),
      tiktokLikes: getCountFromChannel(CH_LIKES_ID),
      
      voiceActivity: voiceData
    });
  } catch (error) {
    console.error("Discord Error:", error);
    return NextResponse.json({ error: 'Sync Failed' }, { status: 500 });
  }
}