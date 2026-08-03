import { getFakeQuoted } from '../../lib/fakeQuoted.js';
export default async (context) => {
  const { client, m } = context;
  const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

  const message = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━
├━━━≫ Sᴜᴘᴘᴏʀᴛ Lɪɴᴋs ≪━━━
├ 
├ *Owner*
├ https:
├ 
├ *Channel Link*
├ https:
├ 
├ *Group*
├ https:
╰━━━━━━━━━━━━━━━━ᕗ
> ©𝖋𝖆𝖎𝖟`;

  try {
    await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
    await client.sendMessage(
      m.chat,
      { text: message },
      { quoted: fq }
    );
  } catch (error) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
    console.error("Support command error:", error);
    await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Failed to send support links.\n├ Try again, you impatient fool.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
  }
};
