import util from 'util';
import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

const BLOCKED_PATTERNS = [
    /process\.env/,
    /config\/settings/,
    /require\s*\(\s*['"].*settings['"]/
];

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, isAdmin, isBotAdmin, Owner, isDev, isSudo, itsMe, store, settings, botNumber, args, pushname, mode, pict, botname, totalCommands } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        try {
            const trimmedText = text.trim();
            if (!trimmedText) {
                await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
                return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ \n├ No command provided for eval!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
            }
            for (const pattern of BLOCKED_PATTERNS) {
                if (pattern.test(trimmedText)) {
                    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
                    return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ BLOCKED ≪━━━\n├ \n├ That eval is blocked for security.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
                }
            }
            let evaled = await eval(trimmedText);
            if (typeof evaled !== 'string') evaled = util.inspect(evaled);
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            if (evaled && evaled !== 'undefined' && evaled !== 'null') await m.reply(evaled);
        } catch (err) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ EVAL ERROR ≪━━━\n├ \n├ ${String(err)}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        }
    });
};
