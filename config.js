const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG: process.env.AlIVE_IMG || "https://www.freepik.com/free-photos-vectors/joker-card",
ALIVE_MSG: process.env.ALIVE_MSG || "Hello I am king joker bot I am alive now",
};
