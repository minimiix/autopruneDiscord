// ---------------------------------------------------
// Discord autoprune channels
// See it in action @ https://discord.gg/XGvHW5D
// https://github.com/tylermammone/disappearingDiscord
// ---------------------------------------------------
// Settings
// ---

const privateBotToken = BOT_TOKEN;

const autoPrune = {
    '699902897319837779':'25', // #general 25 lines (make sure you use your own channel ID number)
    '699954259323650140':'15' // #private 15 lines (make sure you use your own channel ID number)
};

// ---------------------------------------------------
// System
// ---

const discord = require('discord.js');
const client = new discord.Client();

client.login(process.env.privateBotToken);

client.on('ready', async () => {
    console.log('Ready as <@'+client.user.id+'>!');
});

client.on('message', (message) => {
    if(autoPrune[message.channel.id]){
        var pruneAt = parseInt(autoPrune[message.channel.id])+10;
        message.channel.messages.fetch({ limit: pruneAt }).then(messages => {
            let previousMessages = messages.array();
            for(let i = 0; i < previousMessages.length; i++){
                if(i>=parseInt(autoPrune[message.channel.id])){
                    message.channel.messages.fetch(previousMessages[i].id).then(msg => msg.delete()).catch(console.error);
                }
            }          
        }).catch(console.error);
    }
});
