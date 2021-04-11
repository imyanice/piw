require("dotenv").config();
const Discord = require("discord.js")
const client = new Discord.Client();
const {registerCommands, registerEvents}= require("../src/utils/register");


(async () => {
  try {
    await client.login(process.env.BOT_TOKEN);
  } catch (e) {
    console.log(e)
  }
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, "../events");
})();