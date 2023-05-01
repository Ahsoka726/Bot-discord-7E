function aide(message, data) {
  var fs = require("fs");
  let message_string = "Voici la liste : \n";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      message_string +=
        "-  " + data[key].Commande + " : " + data[key].Description + "\n \n";
    }
  }
  message.channel.send(message_string).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 120000); // 5 minutes en millisecondes
  });
  console.log("Message d'aide envoyer");
}
module.exports = {
  aide,
};
