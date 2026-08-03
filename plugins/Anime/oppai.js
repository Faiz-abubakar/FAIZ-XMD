import { getAnime } from '../../lib/frediApi.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
    name: 'oppai',
    aliases: ['animedance', 'animefan'],
    description: 'Get a random oppai anime image',
    run: async (context) => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const url = await getAnime('oppai');
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            await client.sendMessage(m.chat, {
                image: { url },
                caption: '╭━━━ᕙ    FAIZ-XMD    ᕗ━━━\n├━━━≫ Aɴɪᴍᴇ ≪━━━\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖕𝖔𝖜𝖊𝖗𝖊𝖉 𝖇𝖞 𝖋𝖆𝖎𝖟'
            }, { quoted: fq });
        } catch (error) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            await m.reply('╭━━━ᕙ    FAIZ-XMD    ᕗ━━━\n├━━━≫ Eʀʀᴏʀ ≪━━━\n├ \n├ Try again later!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝐏𝐨𝐰𝐞𝐫𝐞ᴅ 𝐁𝐲 Faiz Abubakar');
        }
    }
};
