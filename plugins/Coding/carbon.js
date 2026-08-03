import fetch from 'node-fetch';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';
export default async (context) => {
  const { client, m, text, botname } = context;
  const fq = getFakeQuoted(m);
  await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });


  let cap = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├───≫ CARBON ≪━━━\n├ \n├ Converted By ${botname}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`;

  if (m.quoted && m.quoted.text) {
    const forq = m.quoted.text;

    try {
      let response = await fetch('https://carbonara.solopov.dev/api/cook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: forq,
          backgroundColor: '#1F816D',
        }),
      });

      if (!response.ok) {
          await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
          return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├───≫ ERROR ≪━━━\n├ \n├ API failed to fetch a valid response.\n├ Try again later, genius.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟')
      }

      let per = await response.buffer();

      await client.sendMessage(m.chat, { image: per, caption: cap }, { quoted: fq });
    } catch (error) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
      m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├───≫ ERROR ≪━━━\n├ \n├ An error occured, you broke it.\n├ ${error}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`)
    }
  } else {
    m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├───≫ CARBON ≪━━━\n├ \n├ Quote a code message, idiot.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
  }
}