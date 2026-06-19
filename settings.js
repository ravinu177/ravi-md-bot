const settings = {
    packname: 'ravi-md Bot',
    author: '‎',
    botName: "ravi-md Bot",
    botOwner: 'Professor', 
    ownerNumber: '94768223718', 
    giphyApiKey: 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
    commandMode: "public",
    maxStoreMessages: 20,
    storeWriteInterval: 10000,
    description: "This is a bot for managing group commands and automating tasks.",
    version: "3.0.7",
    // GitHub Secrets වල SESSION_ID හෝ TOKEN විදිහට දැම්මත්, නැත්නම් කෙලින්ම මෙතනින් ගත්තත් වැඩ කරයි
    SESSION_ID: process.env.TOKEN || process.env.SESSION_ID || 'RAVI-MD~unb_e6b0_d758_ca7e_a257_1ec0_37e5'
};

module.exports = settings;
