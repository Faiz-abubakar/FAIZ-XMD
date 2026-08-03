import { botname } from '../../config/settings.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default {
  name: 'dev',
  aliases: ['developer', 'contact', 'owner', 'creator', 'devcontact'],
  description: 'Sends the developer contact as a vCard',
  run: async (context) => {
    const { client, m } = context;
    const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
    const bName = botname || 'Fee-Xmd';

    try {
      const devContact = {
        phoneNumber: '254748253729',
        fullName: 'Faiz Abubakar | Faiz Dev',
        org: 'Fee-Xmd Bot'
      };

      const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${devContact.fullName}\nORG:${devContact.org};\nTEL;type=CELL;type=VOICE;waid=${devContact.phoneNumber}:+${devContact.phoneNumber}\nEND:VCARD`;

      await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
      await client.sendMessage(m.chat, {
        text: `╭━━━ᕙ    FAIZ-XMD    ᕗ━━━\n├━━━≫ Cᴏɴᴛᴀᴄᴛ Cᴀʀᴅ ≪━━━\n├ \n├ Developer: ${devContact.fullName}\n├ Don't spam the dev or you'll\n├ regret your existence.\n├ Contact card sent below.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
      }, { quoted: fq });

      await client.sendMessage(m.chat, {
        contacts: {
          displayName: devContact.fullName,
          contacts: [{ vcard }]
        }
      }, { quoted: fq });

    } catch (error) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
      await client.sendMessage(m.chat, {
        text: `╭━━━ᕙ    FAIZ-XMD    ᕗ━━━\n├━━━≫ Fᴀɪʟᴇᴅ ≪━━━\n├ \n├ Couldn't send contact card.\n├ Error: ${error.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
      }, { quoted: fq });
    }
  }
};
