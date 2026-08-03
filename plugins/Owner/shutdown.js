import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { m } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '💀', key: m.reactKey } });
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        await m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ SHUTDOWN ≪━━━\n├ \n├ 💀 Fee-Xmd going offline...\n├ Don't cry.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
        setTimeout(() => process.exit(0), 2000);
    });
};
