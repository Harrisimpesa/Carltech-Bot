








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0EvWlp2b0ovcWl0VnJ5QWdYbzNuK2tYdkEwNnlwRFhxZE5VMGxhajVVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGp1cHZWT3l3QXJ5TnQ4QUI4aG9XU2RIankwRjFmeVZXYU9kQTNZR1YwMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRmtVVFJyZFRvNGZzYVJVaVBHS2R1V0ZuNG55VDBjcVo2eEtlZFFyMFhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKTHE4ejF3NUZMYjZNTTYwMEZ1UXVBMllQU0d1RmUwejFRaTdqaWxXc204PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldOaU1NZXVTelloNnVyNjE3c3pYT1JDdU90akhibnBOVjVwSjgyR0NBRzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVlZUE0SldiZW40YjBqblo5Ti9OTzhKOXZvZUxudXduZHAzc3Bjb0VSUVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0NOVlZWaHc0Y2RiRXpkS1lDYTZONWo2RWxOUVpQb25RMTVOWUlqU3huZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1hLcDFCMDRvZnoxRE5wTVB0bUtoSENKcks0UUFyS2Z4SlZGSC9ZbElITT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InIvU0pNOGw5QlFVS3JFQ3pFVXBnQXdnS1JIaGhjYjZTZk1UdXh2ang0aEl6bUQvcEhXODZqL1FDRFJ5NnlXc2ExWmhZeVN0WjZwL0liTk13YnJ2SmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU2LCJhZHZTZWNyZXRLZXkiOiJWaUg3UlNGV2VBMGdmSHhRWVFxblhJUG9tV1ZkaERrYVdxYlpHcFo1UjFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwMDgyODUwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzN0Y0QUNCMTI3MEIyRkY5QzVFQTJGMEU0MEYzRjYwMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0Mzc1NDc2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJocjlVR2x1MVNjbTRsSHRmV3R6aFFnIiwicGhvbmVJZCI6IjIxNjdiNjhlLTBiZDEtNGFjMC1iNDRjLWRmYzFjNGNlZWNkZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzbW8raml0bDFDdjB0REJSMlJQR2lYT21tSTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVll3WkxlN1o2UFk2TU1MOEtpUDBWWmV2ekdvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNKRzJQR1I2IiwibWUiOnsiaWQiOiIyNTQ3MDA4Mjg1MDE6NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNb3J0YWwgQW5nZWwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09lazI4SURFSWlkNUw4R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InRkQ1puVnZRRWwyUTkrK2V2amk1cEYzSjBIWjJXNzJpZERQQUo4YjhFMjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6InY0VDd6eGJPdXJqc2dnR2tQZTFRTFRnZWNzVFZFK01sY0dXeDRkYk50b3gwR1Q1TlpXekJpcWxJWnd2WU1UdmthaUZ5dndhbTA4emV6NEhtZzlFc0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsZFp1WDBzTUlON3RFT29vRWMvUjNhWTJuaWEyRXBCSzVSNUQ0a1pvcDBqWTdyM0hTZE9ReVpvcVZWdkZQLzZmYkcxMFZsUnJkU0NRNFVWckd6UUhoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwMDgyODUwMTo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJYUW1aMWIwQkpka1Bmdm5yNDR1YVJkeWRCMmRsdTlvblF6d0NmRy9CTnYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQzNzU0NDUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGcwIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Carl William",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Carl William",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
