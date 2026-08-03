export default {
    name: 'ping',
    description: 'Check bot response time',
    category: 'utility',
    usage: '.ping',
    async execute(sock, message, args) {
        const start = Date.now();
        await sock.sendMessage(message.key.remoteJid, { 
            text: '🏓 Pong! Bot is working!' 
        });
        const end = Date.now();
        await sock.sendMessage(message.key.remoteJid, { 
            text: ⚡ Response time: ms 
        });
    }
};
