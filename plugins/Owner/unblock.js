import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

const toBlockJid = (jid) => {
    if (!jid) return null;
    const user = jid.split('@')[0].split(':')[0].replace(/\D/g, '');
    if (!user) return null;
    return user + '@s.whatsapp.net';
};

const resolveLid = (jid) => {
    if (!jid || !jid.endsWith('@lid')) return jid;
    if (globalThis.resolvePhoneFromLid) {
        const phone = globalThis.resolvePhoneFromLid(jid);
        if (phone && !phone.endsWith('@lid')) return phone;
    }
    if (globalThis.lidPhoneCache) {
        const lidNum = jid.split('@')[0].split(':')[0].replace(/\D/g, '');
        const cached = globalThis.lidPhoneCache.get(lidNum);
        if (cached) return String(cached).replace(/\D/g, '') + '@s.whatsapp.net';
    }
    return jid;
};

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0) && !text) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ \n├ Tag or reply to a user to unblock.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }

        const rawJid = m.mentionedJid?.[0] || m.quoted?.sender || text;
        const raw = resolveLid(rawJid);
        const users = toBlockJid(raw);

        if (!users) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ \n├ Couldn't resolve that user's JID. 😤\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }

        const parts = users.split('@')[0];

        try {
            await client.updateBlockStatus(users, 'unblock');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ UNBLOCKED ≪━━━\n├ \n├ ${parts} is unblocked. Don't make\n├ me regret this.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        } catch (e) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ \n├ Failed to unblock ${parts}. 😒\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }
    });
};
