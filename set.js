const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkhFZi9oNHRsTk5IeGRueFJwbGQ3OUsxRHJYdnVwaUdmQkd0enBlNlBIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmdFYzBuVGJNNGh2UnIwQ2lmbjFaM2dyVEtzdmsrQ05GVklaOHNmK3owZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTWpIV09LVXNwQ21hbGxVeFVRTUFGUUMxb3p2VFNHSzNxcERYNDhVMTE4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLNHMvYWRNMENjZXhFS3MyYU9uRXNjanJTWk9XRjBIbVM5SXJvNWFDZW40PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1OZnV0Nzh1dWYrVG9MWlpjWE9JSnZwc2xhcjd0NWFOWEJPblo2ald4Mzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRGbEs0VWdudGE3VmZJaVNyeEZqZGdNbWhjNkhCdFdNRmo3dS9kYm4xaFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU9PK1ppRGxmV2V5SDBDc3F5U3lGSnF6cUZYMjAvdDI5bm5yQ1V6ZGtYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0tCMDJaSWpDcmM0bzkxYk9PMGJSdmI3bHppWTJLNnpUVHlZakQ0VGdCTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw4MGR5ajE2ZTNYWjkrZURrYTRUUlVxZjZBaERKQk9FNzZQOFIzM01QWTNGamVKQVVsNGFVWDJBR2hUemUwakpKaGJvWEd4a0tZUkJENEZKVDBhTGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6IkF4Q3Q1SWJxeDBxb1laczV4dUFBR1ZaMFAraVoyVnFpak4vZE9QbVV6MFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3ODkyODEyOTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0FERkI3RDZDNzRGREEyNkFFRkRGM0YzOTYwMjc4RjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNTE3OTMxNH1dLCJuZXh0UHJlS2V5SWQiOjIxMCwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjIxMCwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHQjJCM2VRR1FPYTdfcUlqdC00N2hnIiwicGhvbmVJZCI6Ijc5M2EwZDYyLTAwZTUtNDYxNy1hNzE3LWQ3OTYwOTdiMjJkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0MWcybVVIeis1VURCZ3Y0QWZoQ3NXSnZKS3c9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZNNjFhVGZBb3ZKMUdlWlR0R2RQL2lHS0FsZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xEN3plc0hFUGZLMExZR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImNhVCtTUkJDQ052WEVQc01EVk8rZmxML24yUkovRXpyRGRNdkRpNTR3SEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFzeVR6UE9GVCtCYnAyWldYS2JEYnExYWdmR29nN2RJbzg5dHY5RWY4Y2JlejRGT29xTGdGRDl4KzBhTXpxaHVKUWU4STJmR3o5SFZHQVZKR2g0L0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJoZEtISmhzM1k2Um5RWWxVUTczZW9iaTlHQ3JPQnk1WDdra2I5NkNocjNaVFJSY0Zta052SkZTTW5xN2FtSnpNU01EbStPZFR4Z3lhYmZzb2ZXWGRqZz09In0sIm1lIjp7ImlkIjoiOTQ3ODkyODEyOTA6NTNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2FoYW5feHh4X1JJTy4ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3ODkyODEyOTA6NTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWEdrL2trUVFnamIxeEQ3REExVHZuNVMvNTlrU2Z4TTZ3M1RMdzR1ZU1CeSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTE3OTY1NH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

