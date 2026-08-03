import wiki from 'wikipedia';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';
export default async (context) => {

const { client, m, text } = context;
const fq = getFakeQuoted(m);
await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });




        try {
            if (!text) {
                await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
                return m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Provide a term to search, you lazy fool.\n├ E.g: What is JavaScript!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟")
            }
            const con = await wiki.summary(text);
            const texa = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ WIKIPEDIA ≪━━━\n├ \n├ Title: ${con.title}\n├ Desc: ${con.description}\n├ \n├ Summary: ${con.extract}\n├ \n├ URL: ${con.content_urls.mobile.page}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
            m.reply(texa)
        } catch (err) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            console.log(err)
            return m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Got 404. Couldn't find anything, try harder.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟")
        }
    }
