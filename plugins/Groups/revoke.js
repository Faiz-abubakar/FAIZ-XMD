import middleware from '../../utils/botUtil/middleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default async (context) => {
    await middleware(context, async () => {
        const { client, m, groupMetadata } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        try {
            await client.groupRevokeInvite(m.chat);
            const newCode = await client.groupInviteCode(m.chat);
            const newLink = `https://chat.whatsapp.com/${newCode}`;
            const dmJid = typeof m.sender === 'string' && m.sender.endsWith('@s.whatsapp.net') ? m.sender : null;
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            if (dmJid) {
                await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ REVOKED ≪━━━\n├ \n├ Group link revoked!\n├ New link sent to your DM.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
                await client.sendMessage(dmJid, {
                    text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ NEW LINK ≪━━━\n├ \n├ ${newLink}\n├ \n├ New group link for ${groupMetadata?.subject || m.chat}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
                });
            } else {
                await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ REVOKED ≪━━━\n├ \n├ Group link revoked!\n├ New link: ${newLink}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
            }
        } catch (e) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Failed to revoke link: ${e.message?.slice(0, 60)}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }
    });
};
