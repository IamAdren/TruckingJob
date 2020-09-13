const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${prefix}Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    let prefix = cfg.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.toLocaleLowerCase().startsWith(prefix + "trucking")) {
        const embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Available Loads!');
        connection.query('SELECT * FROM truckingloads', function (error, results, fields) {
            if (error) throw error;
            
            if (results.length == 0) {
                embed.setDescription("No Available Loads!");
            } else {    
                if (results.length >= 8) {
                    for (i = 0; i < 8; i++) {
                        let array = JSON.parse(results[i].vehicles);
                        embed.addField("Name", `\`\`\`${results[i].name}\`\`\``, true)
                        embed.addField("Available Vehicles", `\`\`\`${array.join(", ")}\`\`\``, true)
                        embed.addField("Tier", `\`\`\`${results[i].tier}\`\`\``, true)
                    }
                    message.channel.send(embed);

                    const overLimitembed = new Discord.MessageEmbed();
                    for (i = 0; i < results.length - 8; i++) {
                        let array = JSON.parse(results[i + 8].vehicles);
                        overLimitembed.setColor('#0099ff')
                        overLimitembed.addField("Name", `\`\`\`${results[i + 8].name}\`\`\``, true)
                        overLimitembed.addField("Available Vehicles", `\`\`\`${array.join(", ")}\`\`\``, true)
                        overLimitembed.addField("Tier", `\`\`\`${results[i + 8].tier}\`\`\``, true)
                    }
                    message.channel.send(overLimitembed);
                } else {
                    for (i = 0; i < results.length; i++) {
                        let array = JSON.parse(results[i].vehicles);
                        embed.addField("Name", `\`\`\`${results[i].name}\`\`\``, true)
                        embed.addField("Available Vehicles", `\`\`\`${array.join(", ")}\`\`\``, true)
                        embed.addField("Tier", `\`\`\`${results[i].tier}\`\`\``, true)
                    }        
                    message.channel.send(embed);
                }
            }
        });
    }
});

client.login(cfg.botToken);