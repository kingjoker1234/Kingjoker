const {cmd , commands} = require('../command')
const fg = require("api-dylux")
const yts = require("yt-search")


cmd({
    pattern: "song",
    desc: "download song.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(iq) return reply("Please give me url")
const search = await yts(q)
const data = search.videos[0]
const url = deta.url 

let dese = '
🔥"YOURBOT SONG DOWNLOADER"🔥

title: ${data.title}
description: ${data.description}
time: ${data.timestamp}
ago: ${data.ago}
views: ${data.views}

MADE BY HASHEN 💚

await conn.sendMessage(from, { image: {url: deta.thumbnail},caption:dese},{quoted:mek}):

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio + document message
await conn.sendMessage(from, { audio: {url:downloadurl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from, { document: {url:downloadurl},mimetype:"audio/mpeg",fileName:deta,title + ".mp3",caption:"MADE BY KING JOKER"},{quoted:mek})





}catch(e){
console.log{e}
reply('s{e}')
}
}}

//===================video-dl============

cmd({
    pattern: "video",
    desc: "download videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(iq) return reply("Please give me url")
const search = await yts(q)
const data = search.videos[0]
const url = deta.url 

let dese = '
🔥"YOURBOT VIDEO DOWNLOADER"🔥

title: ${data.title}
description: ${data.description}
time: ${data.timestamp}
ago: ${data.ago}
views: ${data.views}

MADE BY HASHEN 💚

await conn.sendMessage(from, { image: {url: deta.thumbnail},caption:dese},{quoted:mek}):

//download video 

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video + document messenge
await conn.sendMessage(from, { video: {url:downloadurl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from, { document: {url:downloadurl},mimetype:"video/mp4",fileName:deta,title + ".mp4",caption:"MADE BY KING JOKER},{quoted:mek})





}catch(e){
console.log{e}
reply('s{e}')
}
}}
