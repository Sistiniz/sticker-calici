module.exports = async (message) => {
    if (message.author.bot) return;
    const { client: bot } = message;

    const prefix = bot.commandHandler.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        bot.commandHandler.commands.get(commandName) ||
        bot.commandHandler.commands.get(
            bot.commandHandler.aliases.get(commandName),
        );

    if (!command) return;

    try {
        command.run(message, args);
    } catch (e) {
        console.error(e);
    }
};