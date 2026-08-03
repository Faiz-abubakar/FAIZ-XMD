import { getFakeQuoted } from '../../lib/fakeQuoted.js';
export default async (context) => {

const { client, m, text, botname } = context;
const fq = getFakeQuoted(m);
await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });



try {
let cap = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ SCREENSHOT ≪━━━\n├ \n├ Screenshot by ${botname}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`

if (!text) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
    return m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Provide a website link to screenshot, moron.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟")
}

const image = `https://image.thum.io/get/fullpage/${text}`

await client.sendMessage(m.chat, { image: { url: image }, caption: cap}, { quoted: fq });


} catch (error) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});

m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ Screenshot failed. Probably your garbage link.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟")

}

}
