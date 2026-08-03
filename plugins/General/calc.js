import { getFakeQuoted } from '../../lib/fakeQuoted.js';

const ALLOWED = /^[0-9+\-*/.()%^ ]+$/;

export default {
    name: 'calc',
    aliases: ['calculate', 'math', 'solve'],
    description: 'Evaluate a mathematical expression',
    run: async (context) => {
        const { client, m, text } = context;
        const fq = getFakeQuoted(m);
        const expr = (text || '').trim();
        if (!expr) {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            return client.sendMessage(m.chat, {
                text: '╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀʟᴄᴜʟᴀᴛᴏʀ ≪━━━\n├\n├ Give me an expression. Usage: .calc 2+2\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        }
        if (!ALLOWED.test(expr)) {
            return client.sendMessage(m.chat, {
                text: '╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀʟᴄᴜʟᴀᴛᴏʀ ≪━━━\n├\n├ Only numbers and operators please. No tricks.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        }
        try {
            const result = Function('"use strict"; return (' + expr + ')')();
            if (result === undefined || result === null || !isFinite(result)) throw new Error('invalid result');
            return client.sendMessage(m.chat, {
                text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀʟᴄᴜʟᴀᴛᴏʀ ≪━━━\n├\n├ 🔢 ${expr}\n├ = ${result}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
            }, { quoted: fq });
        } catch (e) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return client.sendMessage(m.chat, {
                text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴀʟᴄᴜʟᴀᴛᴏʀ ≪━━━\n├\n├ That expression is broken. Fix your math.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
            }, { quoted: fq });
        }
    }
};
