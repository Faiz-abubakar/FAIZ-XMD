import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'coinflip',
    aliases: ['flip', 'coin', 'headstails'],
    description: 'Flip a coin',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);
        const result = Math.random() < 0.5 ? '🪙 Heads' : '🪙 Tails';
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        return client.sendMessage(m.chat, {
            text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Cᴏɪɴ Fʟɪᴘ ≪━━━\n├\n├ ${result}\n├\n├ There. Decision made.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
        }, { quoted: fq });
    }
};
