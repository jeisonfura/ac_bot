const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

var auth;

const defaultRMap = new Map([
	['1️⃣', ''],
	['2️⃣', ''],
	['3️⃣', ''],
	['4️⃣', ''],
	['5️⃣', ''],
	['6️⃣', ''],
	['7️⃣', ''],
	['8️⃣', ''],
	['9️⃣', ''],
	['🔟', '']
]);

/*
// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  auth = authorize(JSON.parse(content));
});

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
  return oAuth2Client;
}
*/

const {prefix, token} = require('./config.json');
const Discord = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {

});

var checkinId

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === `r1`) {
        getRegion1(message);
    } else if(command === `r3`) {
        getRegion3(message);
    } else if(command === `r4`) {
        getRegion4(message);
    } else if(command === `r5`) {
        getRegion5(message);
    } else if(command === `r6`) {
        getRegion6(message);
    } else if(command === `r7`) {
        getRegion7(message);
    } else if(command === `r8`) {
        getRegion8(message);
    } else if(command === `r9`) {
        getRegion9(message);
    } else if(command === `r11`) {
        getRegion11(message);
    } else if(command === `r12`) {
        getRegion12(message);
    } else if(command === `meta`) {
        const metaEmbed = {
            title: 'AC Metas',
            image: {
                url: 'https://imageshack.com/i/poXBAKutp',
            }
        };
        message.channel.send({embed: metaEmbed})
    } else if (command === `sheets`) {
        displaySpreadsheetLink(message);
    } else if (command === `checkin`) {
        message.channel.send(`Click on the sword to check-in to the next battle phase!`)
        .then(message => {
            message.react(`⚔️`)
            checkinId = message.id;
        }).catch(() => {})
    } else if (command === `checkins`) {
        const checkinsEmbed = new Discord.MessageEmbed()
        .setTitle('Players that checked in for next battle phase')
        .setColor(255);
        message.channel.fetch(checkinId).then(m => {
            m.messages.cache.map(theMessage => {
                if (theMessage.id === checkinId) {
                    theMessage.reactions.cache.map(theReaction => {
                        theReaction.users.cache.map(theUser => {
                            if (theUser.username != 'AC') {
                                checkinsEmbed.addField(`\u200b`, theUser.username)
                            }
                        })
                    });
                    message.channel.send(checkinsEmbed);
                }   
            });
        })
    } else if (command === `help`) {
      const helpEmbed = new Discord.MessageEmbed()
        .setTitle('__**Info about AC Bot commands**__')
        .setColor('#764abc');
        helpEmbed.addField(`!ac checkin`, `Displays emoji to check in`);
        helpEmbed.addField(`!ac checkins`, `List players that checked in`);
        helpEmbed.addField(`!ac sheets`, `Link to google sheets`)
        helpEmbed.addField(`!ac r#`, `Displays region, e.g., !ac r1`)
        helpEmbed.addField(`!ac meta`, `Displays AC Meta teams.`)
        message.channel.send(helpEmbed);
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === `⚔️`) {
        reaction.users.cache.map(user => {
            //console.log(user[`username`])
        })
    };
});

function getRegion1(message) {
	let r1 = new Map(defaultRMap);
	displayRegionResults('========== Region 1 ==========', r1, message);
}


function getRegion3(message) {
	let r3 = new Map(defaultRMap);
    displayRegionResults('========== Region 3 ==========', r3, message);
}

function getRegion4(message) {
	let r4 = new Map(defaultRMap);
    displayRegionResults('========== Region 4 ==========', r4, message);
}

function getRegion5(message) {
	let r5 = new Map(defaultRMap);
    displayRegionResults('========== Region 5 ==========', r5, message);	
}

function getRegion6(message) {
	let r6 = new Map(defaultRMap);
    displayRegionResults('========== Region 6 ==========', r6, message);
}

function getRegion7(message) {
	let r7 = new Map(defaultRMap);
    displayRegionResults('========== Region 7 ==========', r7, message);
}

function getRegion8(message) {
	let r8 = new Map(defaultRMap);
    displayRegionResults('========== Region 8 ==========', r8, message);
}

function getRegion9(message) {
	let r9 = new Map(defaultRMap);
    displayRegionResults('========== Region 9 ==========', r9, message);
}

function getRegion10(message) {
	let r10 = new Map(defaultRMap);
    displayRegionResults('========== Region 10 ==========', r10, message);
}

function getRegion11(message) {
	let r11 = new Map(defaultRMap);
    displayRegionResults('========== Region 11 ==========', r11, message);
}

function getRegion12(message) {
	let r12 = new Map(defaultRMap);
    displayRegionResults('========== Region 12 ==========', r12, message);
}

function displayRegionResults(title, region, message) {
    const regionEmbed = new Discord.MessageEmbed()
        .setColor(255)
		.setTitle(title);
	let areaCount = 1
	for (let row of region) {
		regionEmbed.addField(`${areaCount} - ${row[1]}`, '\u200b');
		areaCount++;
	}
	message.channel.send(regionEmbed)
		.then(message => {
			message.react(`1️⃣`)
			.then(() => message.react(`2️⃣`))
			.then(() => message.react(`3️⃣`))
			.then(() => message.react(`4️⃣`))
			.then(() => message.react(`5️⃣`))
			.then(() => message.react(`6️⃣`))
			.then(() => message.react(`7️⃣`))
			.then(() => message.react(`8️⃣`))
			.then(() => message.react(`9️⃣`))
			.then(() => message.react(`🔟`))
			.then(() => message.react(`📋`));
			message.awaitReactions((args, user) => {
				if (!user.bot) {
					if (args._emoji.name === `📋`) {
						// generate summary of message
						let msgSummary = '';
						let count = 0;
						for (let row of region) {
							let sumName = '-'+row[1].substring(0,3);
							if (sumName === '-Non') sumName = '...';
							count++;
							msgSummary += `${count}${sumName} `
						}
						user.send(msgSummary)
						// remove reaction

						//message.reactions.get("📋").remove(user);
					} else if (region.get(args._emoji.name) === '') {
						//console.log(user);
						region.set(args._emoji.name, user.username);
						let updateEmbed = new Discord.MessageEmbed()
						.setColor(255)
						.setTitle(title);
						let areaCount = 1;
						for (let row of region) {
							updateEmbed.addField(`${areaCount} - ${row[1]}`, '\u200b');
							areaCount++;
						}
						message.edit(updateEmbed);
					}
				}
			})
			const filter = () => {return true;}
			const collector = message.createReactionCollector(filter, {dispose: true});
			// event emitts when the reaction had one user removed
			collector.on('remove', (reaction, user) => {
				if (region.get(reaction.emoji.name) === user.username) {
					region.set(reaction._emoji.name, '');
					let updateEmbed = new Discord.MessageEmbed()
					.setColor(255)
					.setTitle(title);
					let areaCount = 1;
					for (let row of region) {
						updateEmbed.addField(`${areaCount} - ${row[1]}`, '\u200b');
						areaCount++;
					}
					message.edit(updateEmbed);
				}
			});
		})
}

function displaySpreadsheetLink(message) {
    message.channel.send(`https://docs.google.com/spreadsheets/d/1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g/edit?usp=sharing`);
}

client.login(token);