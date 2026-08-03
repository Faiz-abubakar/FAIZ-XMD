import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getSudoUsers, addSudoUser } from '../../database/config.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';
import { resolvePhoneNumber } from '../../lib/lidResolver.js';

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, args, participants } = context;
        const fq = getFakeQuoted(m);
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });

        let numberToAdd;

        if (m.quoted) {
            numberToAdd = resolvePhoneNumber(m.quoted.sender, participants);
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            numberToAdd = resolvePhoneNumber(m.mentionedJid[0], participants);
        } else {
            numberToAdd = (args[0] || '').replace(/[^0-9]/g, '');
        }

        if (!numberToAdd || !/^\d+$/.test(numberToAdd)) {
            return client.sendMessage(m.chat, {
                text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ADD SUDO ≪━━━\n├ \n├ Give me a valid number or quote a user, fool!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
            }, { quoted: fq });
        }

        const sudoUsers = await getSudoUsers();
        if (sudoUsers.includes(numberToAdd)) {
            return client.sendMessage(m.chat, {
                text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ADD SUDO ≪━━━\n├ \n├ Already a sudo user, you clueless twit!\n├ ${numberToAdd} is already in the elite ranks.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
            }, { quoted: fq });
        }

        await addSudoUser(numberToAdd);
        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
        return client.sendMessage(m.chat, {
            text: `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ ADD SUDO ≪━━━\n├ \n├ Bow down!\n├ ${numberToAdd} is now a Sudo King!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`
        }, { quoted: fq });
    });
};
