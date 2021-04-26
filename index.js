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
      { name: `@<${message.author.id}>`, value: `**IP:** *SMPxDUPE.minehut.gg*`,}
    )
    .setTimestamp()
    message.channel.send(IP)
  }
})

client.login(process.env.TOKEN)
