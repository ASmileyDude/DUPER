const token = 'ODM1ODUzOTIxNzQ2MDI2NTE3.YIVfoA.nibnKpHdbGWvOc3F84ucj-NTk7A'
const discord = require('discord.js')
const client = new discord.Client
const prefix = "."

client.on('ready', () =>{
    console.log(`${client.user.username} is now online!`)
})

client.on('message', async (message) => {
    if (
      message.content.toLowerCase().startsWith(prefix + 'clear') ||
      message.content.toLowerCase().startsWith(prefix + 'c ')
    ) {
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
      if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;
        } else {
          amount = message.content.split(' ')[1];
          if (amount > 100) {
            amount = 100;
          }
        }
  
        await message.delete().catch(e => { amount++; });
  
        await message.channel.bulkDelete(amount, true).then((_message) => {
          const Clearembed = new discord.MessageEmbed()
          .setTitle(`**CLEARED**`)
          .setDescription(`${message.author.username} cleared ${_message.size} messages!`)
          message.channel.send(Clearembed).then((sent) => {
            setTimeout(function () {
              sent.delete();
            }, 2000);
          });
        });
    }
}
});


client.on('message', async (message) => {
  if(message.content == '!ip'){
    const IP = new discord.MessageEmbed()
    .setTitle(`**IP**`)
    .setDescription(`*Shows you the ip*`)
    .addFields(
      { name: `@${message.author.username}`, value: `**IP:** *SMPxDUPE.minehut.gg*`,}
    )
    .setTimestamp()
    message.channel.send(IP)
  }
  if(message.content == '.ip'){
    const IP = new discord.MessageEmbed()
    .setTitle(`**IP**`)
    .setDescription(`*Shows you the ip*`)
    .addFields(
      { name: `@${message.author.username}`, value: `**IP:** *SMPxDUPE.minehut.gg*`,}
    )
    .setTimestamp()
    message.channel.send(IP)
  }
})

client.on('guildMemberAdd', member => {
  const WelcomeChannel = member.guild.channels.cache.get('835856295385890886');
  const Welcome = new discord.MessageEmbed()
  .setTitle(`**WELCOME**`)
  .setDescription(`Welcome to the server, ${member}!`)
  .setImage(`https://th.bing.com/th/id/Rb5551cd0ca1b2e7e78bcb299c27040e0?rik=WhsZgB78v4%2bg3g&pid=ImgRaw`)
  .setTimestamp()
  WelcomeChannel.send(Welcome);
});

client.login(token)