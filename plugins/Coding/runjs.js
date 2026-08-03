import { getFakeQuoted } from '../../lib/fakeQuoted.js';
import { node } from 'compile-run';
export default async (context) => {
    const { m, text } = context;
    const fq = getFakeQuoted(m);
    await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

    let code = text;

    if (m.quoted && m.quoted.text) {
        code = m.quoted.text;
    }

    if (!code) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
        return m.reply('╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ JS COMPILER ≪━━━\n├ \n├ Provide JavaScript code or quote one.\n├ Example: .runjs console.log("hello")\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟');
    }

    try {
        let result = await node.runSource(code);
        console.log(result);
        
        let output = result.stdout || 'No output';
        let error = result.stderr ? `├ stderr: ${result.stderr}\n` : '';
        
        m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ JS OUTPUT ≪━━━\n├ \n├ ${output}\n${error}╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        
    } catch (err) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
        console.log(err);
        m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ JS ERROR ≪━━━\n├ \n├ ${err.stderr || err.message}\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
    }
};