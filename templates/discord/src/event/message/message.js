const BaseEvent = require("../../utils/structures/BaseEvent");
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }
  async run (client, message) {
    if (message.author.bot) return;
    const prefix = process.env.BOT_PREFIX;
    const usedPrefix = message.content.slice(0, prefix.length);

    if (prefix === usedPrefix) {
      const [cmdName, ...args] = message.content.slice(prefix.length).split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, args);
      }
    }
  }
};
