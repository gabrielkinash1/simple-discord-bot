require("dotenv").config();
const { Client, Intents, Permissions } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
  partials: ["MESSAGE"],
});

const prefix = process.env.DISCORD_PREFIX;

client.on("ready", () => {
  console.log("Bot is running");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(`${prefix} addrole `)) {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      const content = message.content.replace(`${prefix} addrole `, "");
      const args = content.split(" ");
      const color = args[0];
      const roleName = args.slice(1).join(" ");
      message.guild.roles
        .create({
          name: roleName,
          color: color,
          hoist: false,
        })
        .then(async () => {
          await message.channel.send("Role created!");
        })
        .catch(async (err) => {
          await message.channel.send("Failed to create role!");
          console.log(err);
        });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
