import { getAnime } from '../../lib/frediApi.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'uniform',
    aliases: ['animeuniform', 'schoolgirl'],
    description: 'Get a random anime uniform image',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const url = await getAnime('uniform');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await client.sendMessage(m.chat, {
                image: { url },
                caption: '╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Uɴɪꜰᴏʀᴍ ≪━━━\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        } catch (error) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ No uniform found!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
        }
    }
};
