import { getFakeQuoted } from '../../lib/fakeQuoted.js';
import googleTTS from 'google-tts-api';
export default async (context) => {

  const { client, m, text } = context;
  const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });


  if (!text) {
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
      return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ TTS ≪━━━\n├ \n├ Where is the text for conversion?\n├ Can\'t you read instructions?\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
  }

  await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: 'hi-IN',
      slow: false,
      host: 'https://translate.google.com',
    });

    await client.sendMessage(m.chat, { audio: { url:url},mimetype:'audio/mp4', ptt: true }, { quoted: fq });
    await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
  } catch (e) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
    m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ TTS ERROR ≪━━━\n├ \n├ TTS failed. Try again.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
  }

  }