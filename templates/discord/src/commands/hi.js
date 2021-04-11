const BaseCommand = require("../utils/BaseCommand.js");

module.exports = class HiCommand extends BaseCommand {
  constructor() {
    super("hi", "e.g", []) //empty aliases for none 
  }
  async run (client, message) {
    message.reply("Hi ! How are you ?");
  }
}
