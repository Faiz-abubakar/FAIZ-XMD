import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';
import { resolveTargetJid } from '../../lib/lidResolver.js';

const DEV_NUMBER = '255752593977';

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        let rawJid = null;

        if (!m.isGroup && !m.quoted && !text) {
            const chatUser = m.chat.split('@')[0].split(':')[0].replace(/\D/g, '');
            if (chatUser) rawJid = chatUser + '@s.whatsapp.net';
        }

        if (!rawJid && m.quoted?.sender) rawJid = m.quoted.sender;
        if (!rawJid && m.mentionedJid && m.mentionedJid.length > 0) rawJid = m.mentionedJid[0];
        if (!rawJid && text && text.replace(/[^0-9]/g, '')) rawJid = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        if (!rawJid && !m.isGroup) { const chatUser = m.chat.split('@')[0].split(':')[0].replace(/\D/g, ''); if (chatUser) rawJid = chatUser + '@s.whatsapp.net'; }

        if (!rawJid) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ BLOCK ≪━━━\n├ \n├ Tag, reply, or give a number to block. 😒\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }

        let participants = [];
        if (m.isGroup) {
            try { const meta = await client.groupMetadata(m.chat); participants = meta.participants || []; } catch {}
        }

        let blockJid = resolveTargetJid(rawJid, participants);

        if (!blockJid && !m.isGroup) {
            const chatUser = m.chat.split('@')[0].split(':')[0].replace(/\D/g, '');
            if (chatUser) blockJid = chatUser + '@s.whatsapp.net';
        }

        if (!blockJid) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ BLOCK ≪━━━\n├ \n├ Couldn't figure out who that clown is. Try again. 😤\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }

        const _targetNum = blockJid.split('@')[0].replace(/\D/g, '');
        const _botNum = (client.user.id.split(':')[0].split('@')[0].replace(/\D/g, ''));
        if (_targetNum === DEV_NUMBER || _targetNum === _botNum) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ That command cannot be used on the dev or the bot.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }

        try {
            await client.updateBlockStatus(blockJid, 'block');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            const parts = blockJid.split('@')[0];
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ BLOCKED ≪━━━\n├ \n├ +${parts} is blocked. Bye bye, loser. 😈\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        } catch (e) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ BLOCK FAILED ≪━━━\n├ \n├ Couldn't block that fool. Either they're already blocked\n├ or WhatsApp is being a little bitch. 😒\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }
    });
};
