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
    //if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
  return oAuth2Client;
}

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
        getRegion1(message, auth);
    } else if(command === `r3`) {
        getRegion3(message, auth);
    } else if(command === `r4`) {
        getRegion4(message, auth);
    } else if(command === `r5`) {
        getRegion5(message, auth);
    } else if(command === `r6`) {
        getRegion6(message, auth);
    } else if(command === `r7`) {
        getRegion7(message, auth);
    } else if(command === `r8`) {
        getRegion8(message, auth);
    } else if(command === `r9`) {
        getRegion9(message, auth);
    } else if(command === `r11`) {
        getRegion11(message, auth);
    } else if(command === `r12`) {
        getRegion12(message, auth);
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

function getRegion1(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region1!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 1', res, message);
    });
}

function getRegion2(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region2!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 2', res, message);
    });
}

function getRegion3(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region3!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 3', res, message);
    });
}

function getRegion4(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region4!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 4', res, message);
    });
}

function getRegion5(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region5!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 5', res, message);
    });
}

function getRegion6(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region6!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 6', res, message);
    });
}

function getRegion7(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region7!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 7', res, message);
    });
}

function getRegion8(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region8!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 8', res, message);
    });
}

function getRegion9(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region9!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 9', res, message);
    });
}

function getRegion10(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region10!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 10', res, message);
    });
}

function getRegion11(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region11!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 11', res, message);
    });
}

function getRegion12(message, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g',
      range: 'Region12!A1:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      displayRegionResults('Region 15', res, message);
    });
}

function displayRegionResults(title, res, message) {
    const rows = res.data.values;
    const region1Embed = new Discord.MessageEmbed()
        .setColor(255);
    if (rows.length) {
      // Print columns A and B, which correspond to indices 0 and 4.
      rows.map((row) => {
        if (row[0] === `title`) {
          region1Embed.setTitle(`====== ${row[1]} ======`)
        } else if (row[0] === `footer`) {
          region1Embed.setFooter(row[1]);
        } else {
          region1Embed.addField(`${row[1]} ⚔️ ${row[0]}`, `\u200b`);
        }
      });
      message.channel.send(region1Embed);
    }
}

function displaySpreadsheetLink(message) {
    message.channel.send(`https://docs.google.com/spreadsheets/d/1QvFcxojYP-3sjdialW5EEiZY7dKqPRoNLZ0b9ILRF5g/edit?usp=sharing`);
}

client.login(token);