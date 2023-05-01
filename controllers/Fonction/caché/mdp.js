const fs = require("fs");
const { Client, userMention } = require("discord.js");
const { measureMemory } = require("vm");
const client = new Client({ intents: 3276799 });

function MDP(message){
    
    const password = '123456789';

    const passwordVerif = message.content;

    if ( passwordVerif == password){

        message.channel.send('Coucou');
        console.log('ça fonctionne');
        
    } else {

        message.channel.send('Wesh, ptdr t\'es ki ?! \nTu auras pas accès mdr');
        console.log('ça fonctionne pas');
        
    }
    
    
}


module.exports = {
    MDP
};