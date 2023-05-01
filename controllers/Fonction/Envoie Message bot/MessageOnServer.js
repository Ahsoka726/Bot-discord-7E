const fs = require("fs");
const { Client, userMention } = require("discord.js");
const { measureMemory } = require("vm");
const client = new Client({ intents: 3276799 });

  //Function pour l'envoi d'un message de vote sur le salon #vote-serveur-music
  function MessageVote(client) {
    //ID du salon cible
    const channelId = '993515315646431242';

    const channel = client.channels.cache.get(channelId);
    
    //Message d'erreur si il ne trouve pas l'id du salon
    if (!channel) return console.error(`Le canal avec l'ID ${channelId} est introuvable.`);
    //Message qui sera envoyé lors de la commande ?vote 
    channel.send('Clique ici pour voter le serveur de la 7E Compagnie sur Top Serveur ! \nhttps://top-serveurs.net/arma3/la-7e-compagnie');
  }

  //Function pour l'envoi d'un message de vote sur le salon #inscription
  function MessageInscription(client) {
    //ID du salon cible
    const channelId = '993515315646431242';

    const channel = client.channels.cache.get(channelId);
    
    //Message d'erreur si il ne trouve pas l'id du salon
    if (!channel) return console.error(`Le canal avec l'ID ${channelId} est introuvable.`);

    /* id rôle de test <@&1095675116068802634> ;*/

    //Message qui sera envoyé lors de la commande ?inscription avec les rôles
    channel.send('Inscrivez-vous dès maintenant pour la dernière mission de l`\opération Météore ! \n \nhttps://app.arma.la7e.fr/operations \n \n <@&1095675116068802634>');
  }

  //Function pour l'envoi d'un message pour incorporation membre
  function MessageNew7E(client, message) {
    //ID du salon cible
    const channelId = '993515315646431242';

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    
    let currentDate = `${day}/${month}/${year}`;
    //  Format de la date = "17/6/2022"
    console.log(currentDate); 
    
    //Déclaration de la variable user pour récupérer l'id user mentionner 
    let user =  message.mentions.members.first();

    const channel = client.channels.cache.get(channelId);
    
    //Message d'erreur si il ne trouve pas l'id du salon
    if (!channel) return console.error(`Le canal avec l'ID ${channelId} est introuvable.`);

    //Message qui sera envoyé lors de la commande ?incorporation @membre 
    channel.send(`Bienvenue au nouvel engagé ${user}. \nIncorporé le ${currentDate} au sein de la :thumbsup: compagnie`);

    // =====================================================================================================================
    // Condition lorsque la commande ?incorporation @membre est executé, le rôle d'user change.
    if (user == user){
    // Récupération de l'utilisateur et des rôles à ajouter / supprimer
      let user =  message.mentions.members.first();

      const newRole = message.guild.roles.cache.find(role => role.name === 'Developpeur');
      const oldRole = message.guild.roles.cache.find(role => role.name === 'VIP');

    // Ajout du nouveau rôle et suppression de l'ancien rôle
      user.roles.add(newRole);
      user.roles.remove(oldRole);

    } else {

      channel.send('Il y a eu une erreur . Veuillez contacter Ahsoka');    
    
    }
    // =====================================================================================================================
  }

  //Function pour ajouter des rôles à plusieurs membres avec 1 commande 
  function addRoleOpe(client, message){
    //ID du salon cible
    const channelId = '993515315646431242';

    const channel = client.channels.cache.get(channelId);

    // Récupérer le rôle à ajouter
    const role = message.guild.roles.cache.find(role => role.name === "VIP");

    // Récupérer les mentions de membres
    const mentions = message.mentions.members;

    // Ajouter le rôle à chaque membre mentionné
    mentions.forEach(member => {
      member.roles.add(role)
        .then(() => console.log(`Rôle ${role} ajouté à ${member.user.tag}`))
        .catch(console.error);
    });

    channel.send(`Le rôle ${role} a bien était ajouté sur les membres`);

  }

// Ne surtout pas supprimer !!!
module.exports = {
  MessageVote,
  MessageInscription,
  MessageNew7E,
  addRoleOpe
};



