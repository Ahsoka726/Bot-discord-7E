const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const client = new Client({ intents: 3276799 });

async function ListRole(message) {
    const roles = message.guild.roles.cache.filter(role => !role.managed && role !== message.guild.roles.everyone);
    const roleButtons = roles.map(role => {
      return new ButtonBuilder()
        .setCustomId(`role_${role.id}`)
        .setLabel(role.name)
        .setStyle(typeof role.style === 'string' || typeof role.style === 'number' ? role.style : ButtonStyle.Success);
    });

  const row1 = roleButtons.slice(0, 5);
  const row2 = roleButtons.slice(5, 10);
  const row3 = roleButtons.slice(10, 15);
  const row4 = roleButtons.slice(15, 20);

  const components = [];

  if (row1.length > 0) {
    components.push({ type: 1, components: row1 });
  }

  if (row2.length > 0) {
    components.push({ type: 1, components: row2 });
  }

  if (row3.length > 0) {
    components.push({ type: 1, components: row3 });
  }

  if (row4.length > 0) {
    components.push({ type: 1, components: row4 });
  }

  await message.reply({
    content: "Liste des rôles :",
    components: components
  });
}

module.exports = { ListRole };
