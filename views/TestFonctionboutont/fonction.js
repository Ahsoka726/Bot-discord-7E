const IdSalonGeneral = 1077880684686880768;
// Fonctions basic 
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 3276799 });

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
  // data: new SlashCommandBuilder()...
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm Ban')
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(cancel, confirm);

    await interaction.reply({
      content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
      components: [row],
    });
  },
};

function AjoutReaction(message, emoji) {
  //const message = await message.channel.messages.fetch('<message_id>');
  const greenTickEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emoji);
  message.react(greenTickEmoji);
  //message.react(emoji);
}


function constructBtPatPatrol(present, absent, row) {
  present
    .setCustomId('present')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Primary);

  absent
    .setCustomId('absent')
    .setEmoji('❌')
    .setStyle(ButtonStyle.Secondary);
}
// Vérifier si l'utilisateur est déjà dans le set correspondant et mettre à jour la réponse en conséquence
async function VerifPatrouilleMembers(interaction, absentUsers, presentUsers) {
  const username = interaction.user.username;
  const customId = interaction.customId;
  if (customId === 'present') {
    if (absentUsers.has(username)) {
      absentUsers.delete(username);
      presentUsers.add(username);
    } else if (!presentUsers.has(username)) {
      presentUsers.add(username);
    }
  } else if (customId === 'absent') {
    if (presentUsers.has(username)) {
      presentUsers.delete(username);
      absentUsers.add(username);
    } else if (!absentUsers.has(username)) {
      absentUsers.add(username);
    }
  }
}
// Mettre à jour la réponse en ajoutant la liste des utilisateurs présents et absents
async function MajReponsePatrouille(presentUsers, absentUsers, interaction) {
  let content = 'Patrouille  \n - Présents : \n';
  if (presentUsers.size > 0) {
    content += Array.from(presentUsers).join("\n") + "\n";
  } else {
    content += "-\n";
  }
  content += '- Absents : \n';
  if (absentUsers.size > 0) {
    content += Array.from(absentUsers).join("\n") + "\n";
  } else {
    content += "-\n";
  }
  await interaction.update({ content: content });
}

async function ReactionPatPatrol(message) {
  const present = new ButtonBuilder();
  const absent = new ButtonBuilder();

  constructBtPatPatrol(present, absent);

  const row = new ActionRowBuilder()
    .addComponents(present, absent);

  const response = await message.reply({
    content: 'Patrouille  \n - Présents : \n -  \n - Absents : \n - ',
    components: [row],
  });

  const presentUsers = new Set(); // Set pour stocker les utilisateurs présents
  const absentUsers = new Set(); // Set pour stocker les utilisateurs absents

  const collector = response.createMessageComponentCollector({
    filter: interaction => {
      return interaction.isButton() && (interaction.customId === 'present' || interaction.customId === 'absent');
    },
    max: 50, // Maximum de joueurs pouvant se mettre en présent
  });

  collector.on('collect', async (interaction) => {
    VerifPatrouilleMembers(interaction, absentUsers, presentUsers);
    MajReponsePatrouille(presentUsers, absentUsers, interaction);
  });
}



// Commande !cleanup@role

module.exports = {
  AjoutReaction,
  ReactionPatPatrol
};
