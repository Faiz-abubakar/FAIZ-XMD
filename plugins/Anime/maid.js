import { getAnime } from '../../lib/frediApi.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'maid',
    aliases: ['animemaid', 'maidpic'],
    description: 'Get a random anime maid image',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const url = await getAnime('maid');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await client.sendMessage(m.chat, {
                image: { url },
                caption: '╭━━━ᕙ    ᖴAIZ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Mᴀɪᴅ ≪━━━\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        } catch (error) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply('╭━━━ᕙ    ᖴAIZ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Maid is busy!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
        }
    }
};
