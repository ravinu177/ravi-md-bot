// 🧹 Fix for ENOSPC / temp overflow in hosted panels
const fs = require('fs');
const path = require('path');

const customTemp = path.join(process.cwd(), 'temp');
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;

setInterval(() => {
    fs.readdir(customTemp, (err, files) => {
        if (err) return;
        for (const file of files) {
            const filePath = path.join(customTemp, file);
            fs.stat(filePath, (err, stats) => {
                if (!err && Date.now() - stats.mtimeMs > 3 * 60 * 60 * 1000) {
                    fs.unlink(filePath, () => { });
                }
            });
        }
    });
}, 3 * 60 * 60 * 1000);

// --- Imports (ඔයාගේ සියලුම require ටික මෙතන තියෙන්න දෙන්න) ---
const settings = require('./settings');
require('./config.js');
const { isBanned } = require('./lib/isBanned');
const { isSudo } = require('./lib/index');
const isOwnerOrSudo = require('./lib/isOwner');
const { handleAutoread } = require('./commands/autoread');
const { storeMessage, handleMessageRevocation, handleAntideleteCommand } = require('./commands/antidelete');
const { handleBadwordDetection } = require('./lib/antibadword');
const { Antilink } = require('./lib/antilink');
const { handleAutotypingForMessage, showTypingAfterCommand, autotypingCommand } = require('./commands/autotyping');
const { handleTagDetection } = require('./commands/antitag');
const { handleMentionDetection } = require('./commands/mention');
const { handleChatbotResponse } = require('./commands/chatbot');
const { incrementMessageCount } = require('./commands/topmembers');
const { addCommandReaction } = require('./lib/reactions');
const helpCommand = require('./commands/help');

// --- ප්‍රධාන Function එක ---
async function handleMessages(sock, messageUpdate, printLog) {
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        await handleAutoread(sock, message);
        if (message.message) storeMessage(sock, message);
        
        if (message.message?.protocolMessage?.type === 0) {
            await handleMessageRevocation(sock, message);
            return;
        }

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        const senderIsOwnerOrSudo = await isOwnerOrSudo(senderId, sock, chatId);
        const isOwnerOrSudoCheck = message.key.fromMe || senderIsOwnerOrSudo;

        const userMessage = (
            message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            message.message?.buttonsResponseMessage?.selectedButtonId?.trim() ||
            ''
        ).toLowerCase().replace(/\.\s+/g, '.').trim();

        let isPublic = true;
        try {
            const data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof data.isPublic === 'boolean') isPublic = data.isPublic;
        } catch (e) {}

        if (isBanned(senderId) && !userMessage.startsWith('.unban')) return;
        if (!message.key.fromMe) incrementMessageCount(chatId, senderId);

        if (isGroup) {
            if (userMessage) await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
            await Antilink(message, sock);
        }

        if (!userMessage.startsWith('.')) {
            await handleAutotypingForMessage(sock, chatId, userMessage);
            if (isGroup) {
                await handleTagDetection(sock, chatId, message, senderId);
                await handleMentionDetection(sock, chatId, message);
                if (isPublic || isOwnerOrSudoCheck) await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
            }
            return;
        }

        if (!isPublic && !isOwnerOrSudoCheck) return;

        let commandExecuted = false;

        // Switch Case
        switch (true) {
            case userMessage === '.jid':
                await groupJidCommand(sock, chatId, message);
                commandExecuted = true;
                break;
            case userMessage === '.help':
                await helpCommand(sock, chatId, message, global.channelLink);
                commandExecuted = true;
                break;
            // ඔයාගේ අනිත් command cases ටික මෙතන තියෙන්න දෙන්න
        }

        if (commandExecuted) {
            await showTypingAfterCommand(sock, chatId);
            await addCommandReaction(sock, message);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// --- පිටත ඇති Functions ---
async function groupJidCommand(sock, chatId, message) {
    if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: "❌ Group only." });
    await sock.sendMessage(chatId, { text: `✅ Group JID: ${chatId}` }, { quoted: message });
}

// --- ඔයාගේ ඉතිරි සියලුම Helper Functions මෙතනට දාන්න ---
