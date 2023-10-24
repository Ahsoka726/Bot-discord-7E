const fs = require("fs");
const { Client, userMention } = require("discord.js");
const { measureMemory } = require("vm");
const client = new Client({ intents: 3276799 });

function NouveauMembre(member, client) {
  //Déclaration salon id du serveur
  const channelId = '733265815406641252';
  
  const channel = client.channels.cache.get(channelId);

  //Message d'erreur s'il ne trouve pas l'id du salon
  if (!channel) return console.error(`Le canal avec l'ID ${channelId} est introuvable.`);

  channel.send( `Bienvenue ${member.user.tag} sur le serveur Star Wars Universe [FR]! Tu peux aller dans <#728698140684845097> pour ajouter tes rôles :grogu_happy: et je t'invite à lire le règlement qui se trouve ici <#728643330191261697>`);
}
  
  // Trouver la clé du message correspondant au préfixe de la commande
  /*function EnvoieMessagePredef(message, selection) {
    var fs = require("fs");
    const member = message.mentions.members.first();
    const message_string = selection.Contenue.replace("###", member);
    member.send(message_string);
    message.reply(selection.Reponse, member.user.tag).then(msg => {
      setTimeout(() => {
        msg.delete();
      }, 120000); // 5 minutes en millisecondes
    }); //en mili secondes 1 minutes= 120000 ms;; // Envoyer un message privé au nouveau membre;
    console.log(member.user.tag, selection.Reponse);
  }*/
module.exports = {
  NouveauMembre
};
