const { Client } = require("discord.js");
const client = new Client({ intents: 3276799 });
const fs = require("fs");
//appel au fichier pour récuperer le token ou autre informations
const { token, prefix } = require("../Config/config.json");
client.on("messageCreate", async (message) => {
  // Un message est posté
  if (message.content.startsWith(prefix + "mdp")){
  const ListFonction = require("../controllers/Fonction/caché/mdp.js");
  ListFonction.MDP(message); 

    if (message.author.bot) return; // Ignore si message bot


    //Start condition commande 
    if (message.content.startsWith(prefix + "Staff")) {
      const Fonctions = require("../controllers/Fonction/Members/WelcomeMembers/Welcome");
      const Ressources = require("../models/Ressources/WelcomMessage.json");
      Fonctions.EnvoieMessagePredef(message, Ressources.Staff); // Message staff

    } else if (message.content.startsWith(prefix + "Bienvenue")) {
      const Fonctions = require("../../Controleur/Fonction/Members/WelcomeMembers/Welcome");
      const Ressources = require("../../Model/Ressources/WelcomMessage.json");
      Fonctions.EnvoieMessagePredef(message, Ressources.Bienvenue);

      // Envoie en MP un mesage à l'utilisateur "Quoicoubeuh"
    } else if (message.content.startsWith(prefix + "Quoicoubeuh")) {
      const Fonctions = require("../controllers/Fonction/Members/WelcomeMembers/Welcome");
      const Ressources = require("../models/Ressources/WelcomMessage.json");
      Fonctions.EnvoieMessagePredef(message, Ressources.Quoicoubeuh);

      // Envoie en MP un mesage à l'utilisateur "Miaou"
    } else if (message.content.startsWith(prefix + "Miaou")) {
      const Fonctions = require("../controllers/Fonction/Members/WelcomeMembers/Welcome");
      const Ressources = require("../models/Ressources/WelcomMessage.json");
      Fonctions.EnvoieMessagePredef(message, Ressources.Miaou); //Envoie Message MP Miaou

      // Envoie sur le serveur le lien de vote pour le serveur
    } else if (message.content.startsWith(prefix + "vote")) {
      const ListFonction = require("../controllers/Fonction/Envoie Message bot/MessageOnServer");
      ListFonction.MessageVote(client); // Message de vote

      // Envoie le lien pour l'inscription au opé ( Possible de changer la mise en forme et le contenue ) .
    } else if (message.content.startsWith(prefix + "inscription")) {
      const ListFonction = require("../controllers/Fonction/Envoie Message bot/MessageOnServer");
      ListFonction.MessageInscription(client); // Message de inscription

      // Envoie le message d'incorporation d'un membre et lui modifie ses rôles automatiquements ( Possible de changer la mise en forme et le contenue ) .
    } else if (message.content.startsWith(prefix + "incorporation")) {
      const ListFonction = require("../controllers/Fonction/Envoie Message bot/MessageOnServer");
      ListFonction.MessageNew7E(client, message); // Message de incorporation

      // Ajoute un rôle à plusieurs utilisateurs en même temps.
    } else if (message.content.startsWith(prefix + "addRole")) {
      const ListFonction = require("../controllers/Fonction/Envoie Message bot/MessageOnServer");
      ListFonction.addRoleOpe(client, message); // Message de inscription
      
      // Commande pour de l'aide
    } else if (message.content.startsWith(prefix + "SOS")) {
      const ListFonction = require("../controllers/Fonction/Message/Aide/FunctionList");
      const Ressources = require("../../Model/Ressources/ListFonction.json");
      ListFonction.aide(message, Ressources); // Message d'aide

      // Commande pour supprimer plus de 100 message 
    } else if (message.content.startsWith(prefix + "MsgClean")) {
      const DeleteMessage = require("../controllers/Fonction/Message/DeleteMessageChannel.js");
      const channelId = message.channelId;
      console.log(channelId);
      const channel = client.channels.cache.get(channelId);
      DeleteMessage.clearChannel(channel);
      message.channel
        .send("Le channel " + channel.name + " a été supprimé avec succès.")
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 120000); // 5 minutes en millisecondes
        });

    } 

  } 

});
  
//connexion du bot au serveur
client.on("ready", () => {
  console.log(
    `Bot connecté ${client.user.tag},\n Je suis membre de  ${client.guilds.cache.size} Serveurs`
  );
});
//appel du token du bot

client.login(token);
