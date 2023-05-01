const { MessageActionRow,  MessageButton  } = require('discord.js');
const { ButtonStyle } = require('discord.js');

function ListRole(message) {
  const roles = message.guild.roles.cache.filter(role => !role.managed && role.id !== message.guild.id);

  const roleButtons = roles.map(role => new MessageButton()
    .setCustomId(role.id)
    .setLabel(role.name)
    .setStyle('PRIMARY'));

  const buttonRows = [];

  while (roleButtons.length) {
    buttonRows.push(new MessageActionRow()
      .addComponents(roleButtons.splice(0, 5)));
  }

  const listMessage = {
    content: 'Liste des rôles:',
    components: buttonRows,
  };

  message.channel.send(listMessage);

  const filter = i => i.customId && i.message.id === listMessage.id;
  const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', i => {
    const role = message.guild.roles.cache.get(i.customId);
    const reply = `Le rôle sélectionné est ${role.name}.`;
    message.channel.send(reply);
  });

  collector.on('end', () => {
    listMessage.components.forEach(row => row.components.forEach(button => button.setDisabled()));
    message.channel.send('La liste des rôles n\'est plus disponible.');
  });
}

module.exports = { ListRole };
