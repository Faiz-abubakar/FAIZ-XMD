import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

function emojiToTwemojiUrl(emoji) {
    const codepoints = [...emoji]
        .map(c => c.codePointAt(0).toString(16).toLowerCase())
        .filter(cp => cp !== 'fe0f');
    return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/${codepoints.join('-')}.png`;
}

export default async (context) => {
    const { client, m, text } = context;
    const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

    try {
        if (!text) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ EMOJI ART ≪━━━\n├ \n├ Give me an emoji!\n├ Example: .togif 😂\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
        }

        const emojiMatch = text.match(/\p{Emoji}/u);
        if (!emojiMatch) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ EMOJI ART ≪━━━\n├ \n├ That\'s not an emoji. Give me a real one.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
        }

        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        const emoji = emojiMatch[0];
        const imgUrl = emojiToTwemojiUrl(emoji);

        const res = await fetch(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) throw new Error(`Emoji not found in Twemoji set`);

        const buffer = Buffer.from(await res.arrayBuffer());

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
        await client.sendMessage(m.chat, {
            image: buffer,
            caption: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ EMOJI ART ≪━━━\n├ \n├ ${emoji}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
        }, { quoted: fq });

    } catch (error) {
        console.error("togif command error:", error);
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ERROR ≪━━━\n├ \n├ Failed to fetch emoji art:\n├ ${error.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
    }
};
