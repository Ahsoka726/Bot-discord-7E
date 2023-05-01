const fs = require("fs");
function NouveauMembre(member, client) {
  const channel = client.channels.cache.get(IdSalonGeneral);
  channel.send("Bienvenue sur le serveur: ${member.user.tag}");
  member.send("Voici toutes les infos qui te seront nécessaire"); //en mili secondes 1 minutes= 120000 ms;; // Envoyer un message privé au nouveau membre
}
  // Trouver la clé du message correspondant au préfixe de la commande
  function EnvoieMessagePredef(message, selection) {
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
  }
module.exports = {
  NouveauMembre,
  EnvoieMessagePredef
};
