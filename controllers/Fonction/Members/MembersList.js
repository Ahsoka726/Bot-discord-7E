
function ListeMembres(message) {
    const guild = message.guild;
    const members = guild.members.cache.map(member => member.user.tag).join('\n');
    message.channel.send(`Liste des membres du serveur :${members}`).then(msg => {
      setTimeout(() => {
        msg.delete();
      }, 120000); // 5 minutes en millisecondes
    }); //en mili secondes 1 minutes= 120000 ms
  }
module.exports ={
    ListeMembres
}  