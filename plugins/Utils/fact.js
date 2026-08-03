import axios from 'axios';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default async (context) => {
    const { client, m } = context;
    const fq = getFakeQuoted(m);
    try {
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        const { data } = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', { timeout: 8000 });
        const fact = data?.text;
        if (!fact) throw new Error('no fact');
        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
        await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ RANDOM FACT ≪━━━\n├ \n├ ${fact}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
    } catch {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Couldn't fetch a fact. The universe said no.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
    }
};
