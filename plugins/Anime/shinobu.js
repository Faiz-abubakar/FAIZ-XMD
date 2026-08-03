import { getAnime } from '../../lib/frediApi.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'shinobu',
    aliases: ['shinobukocho', 'demonslayergirl'],
    description: 'Get a random Shinobu anime image',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const url = await getAnime('shinobu');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await client.sendMessage(m.chat, {
                image: { url },
                caption: '╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Sʜɪɴᴏʙᴜ ≪━━━\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        } catch (error) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Shinobu vanished!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
        }
    }
};
