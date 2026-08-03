import { getGroupSettings } from '../../database/config.js';
import ownerMiddleware from '../../utils/botUtil/Ownermiddleware.js';
import { getFakeQuoted } from '../../lib/fakeQuoted.js';

export default async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m } = context;
        const fq = getFakeQuoted(m);

        const jid = m.chat;

        if (!jid.endsWith('@g.us')) {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return await m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ This command is for groups only, you fool.\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟");
        }

        await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
        let groupSettings = await getGroupSettings(jid);

        if (!groupSettings) {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } }).catch(() => {});
            return await m.reply("╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├ No group settings found. Configure something first!\n╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟");
        }

        const on = (v) => (v ? '✅ ON' : '❌ OFF');
        let response = `╭━━━ᕙ    ᖴᗴᗴ-᙭ᗰᗪツ    ᕗ━━━\n├━━━≫ GROUP SETTINGS ≪━━━\n├ \n`;
        response += `├ Antilink: ${on(groupSettings.antilink)}\n`;
        response += `├ Antidelete: ${on(groupSettings.antidelete)}\n`;
        response += `├ Events: ${on(groupSettings.events)}\n`;
        response += `├ Antitag: ${on(groupSettings.antitag)}\n`;
        response += `├ GCPresence: ${on(groupSettings.gcpresence)}\n`;
        response += `├ Antiforeign: ${on(groupSettings.antiforeign)}\n`;
        response += `├ Antidemote: ${on(groupSettings.antidemote)}\n`;
        response += `├ Antipromote: ${on(groupSettings.antipromote)}\n`;
        response += `├ Welcome: ${on(groupSettings.welcome)}\n`;
        response += `├ Goodbye: ${on(groupSettings.goodbye)}\n`;
        response += `╰━━━━━━━━━━━━━━━━ᕗ\n> ©𝖋𝖆𝖎𝖟`;

        await m.reply(response);
        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
    });
};
