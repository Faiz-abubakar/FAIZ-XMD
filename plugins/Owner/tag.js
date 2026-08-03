import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js'; 
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default async (context) => {
    await ownerMiddleware(context, async () => {


        const { client, m, args, participants, text } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });


if (!m.isGroup) {
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
    return m.reply(`╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ \n├ Command meant for groups.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`);
}



client.sendMessage(m.chat, { text : text ? text : 'Attention Here' , mentions: participants.map(a => a.id)}, { quoted: fq });

});

}
