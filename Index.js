// index.js - King Joker Bot Full Setup with Always Online Presence

const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys'); const P = require('pino'); const fs = require('fs'); const path = require('path'); const express = require('express'); const app = express(); const port = process.env.PORT || 8000; const connectDB = require('./plugins/mongodb'); const { readEnv } = require('./lib/database'); const setting = require('./.setting');

let sentWelcome = false;

async function connectToWA() { connectDB();

const config = await readEnv(); const prefix = config.PREFIX;

console.log("Connecting wa bot 🤖..."); const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/'); const { version } = await fetchLatestBaileysVersion();

const conn = makeWASocket({ logger: P({ level: 'silent' }), printQRInTerminal: false, browser: Browsers.macOS("Firefox"), syncFullHistory: true, auth: state, version });

conn.ev.on('connection.update', async (update) => { const { connection, lastDisconnect } = update; if (connection === 'close') { if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) { connectToWA(); } } else if (connection === 'open') { console.log('🐱 Installing...') fs.readdirSync("./plugins/").forEach((plugin) => { if (path.extname(plugin).toLowerCase() === ".js") { require("./plugins/" + plugin); } }); console.log('Plugins installed ✅'); console.log('Bot connected to WhatsApp ✅');

// Always Online Presence
  if (setting.AUTO_ONLINE) {
    setInterval(() => {
      conn.sendPresenceUpdate('available');
    }, 10000);
  }

  if (setting.AUTO_TYPING) {
    setInterval(() => {
      conn.sendPresenceUpdate('composing');
    }, 12000);
  }

  if (setting.AUTO_RECORDING) {
    setInterval(() => {
      conn.sendPresenceUpdate('recording');
    }, 15000);
  }

  if (!sentWelcome) {
    const up = `👑 King Joker Bot connected successfully ✅\n🔥 Type .menu to see commands!\n⚡ I'm ready to serve you!`;
    conn.sendMessage("94729101856@s.whatsapp.net", { text: up });
    sentWelcome = true;
  }
}

});

conn.ev.on('creds.update', saveCreds);

conn.ev.on('messages.upsert', async (mek) => { mek = mek.messages[0]; if (!mek.message) return; if (mek.key && mek.key.remoteJid === 'status@broadcast' && setting.AUTO_READ_STATUS === true) { await conn.readMessages([mek.key]); }

const m = {};
m.conn = conn;
m.type = getContentType(mek.message);
m.content = JSON.stringify(mek.message);
m.from = mek.key.remoteJid;
m.quoted = m.type === 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage : null;
m.body = (m.type === 'conversation') ? mek.message.conversation : (m.type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : '';
const command = m.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
const args = m.body.trim().split(/ +/).slice(1);
const isCmd = m.body.startsWith(prefix);
const isGroup = m.from.endsWith('@g.us');
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net') : mek.key.participant || mek.key.remoteJid;
const senderNumber = sender.split('@')[0];
const botNumber = conn.user.id.split(':')[0];
const pushname = mek.pushName || 'Sin Nombre';
const isMe = botNumber.includes(senderNumber);
const isOwner = setting.ownerNumber.includes(senderNumber) || isMe;
const botNumber2 = await jidNormalizeUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(m.from).catch(e => { }) : '';
const groupName = isGroup ? groupMetadata.subject : '';
const participants = isGroup ? await getGroupAdmins(groupMetadata.participants) : '';
const isBotAdmins = isGroup ? participants.includes(botNumber2) : false;
const isAdmins = isGroup ? participants.includes(sender) : false;
const isReact = m.message?.reactMessage ? true : true;

// Add your command handlers here.

}); }

connectToWA();

app.get('/', (req, res) => res.send('King Joker Bot 🤖 is Running...')); app.listen(port, () => console.log(Server running on port ${port}));

