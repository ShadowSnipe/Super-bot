const BotSettings = require("./BotSettings.json");
const Discord = require("discord.js");
const prefix = BotSettings.prefix;
const bot = new Discord.Client();
bot.on("ready", async () => {
  console.log(`bot is ready! ${bot.user.username}`);
  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});
client.login(process.env.NDYwMjc2NTY4NjI4MTMzODg4.DhCZfA.xYdVZBixD4DAvJBiDFNrnqwuP1E);
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type  === "dm") return;
  let messagearray = message.content.split(" ");
  let command = messagearray[0];
  let args = messagearray.slice(1);
 if(!command.startsWith(prefix)) return;
 if(command ===`${prefix}userinfo`) {
   let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`)
      .setDescription("This user's very g a y")
      .setColor("#5bf85f")
      .addField("Full Username", `${message.author.username}#${message.author.discriminator} `)
      .addField("ID", message.author.id)
      .addField("Created at", message.author.createdAt);

      message.channel.send(embed);
      return;
    }
    if(command === `${prefix}mute`) {
      if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("you dont have manage messages");
      //get mentioned user return if mentioned
      let toMute = message.guild.member (message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!toMute) return message.channel.sendMessage("You did not mention a user kid");
      let role = message.guild.roles.find(r => r.name === "silent")
      if(!role) {
        try{
        role = await message.guild.createRole({
          name: "silent",
          color: "#596f07",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
        }catch(e) {
          console.log(e.stack);
        }
      }
      if(toMute.roles.has(role.id)) return message.channel.sendMessage("Already muted user");
      await toMute.addRole(role);
      message.channel.sendMessage("I have muted them");

      return;
//This is the muted code

    }

    if(command === `${prefix}unmute`) {
      if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("you dont have manage messages");
      //get mentioned user return if mentioned
      let toMute = message.guild.member (message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!toMute) return message.channel.sendMessage("You did not mention a user kid");

      let role = message.guild.roles.find(r => r.name === "silent")

if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted");

      await toMute.removeRole(role);

      message.channel.sendMessage("I have unmuted them");

      return;
//This is the unmuted code

    }
});
bot.login(BotSettings.token);
