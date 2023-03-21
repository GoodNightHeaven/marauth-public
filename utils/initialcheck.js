const config = require('../config.json');

const secret = config.azure.client_secret;
const client_id = config.azure.client_id;
const redirecturl = config.azure.redirect_uri;
const webhook = config.webhook.url;


const Check = () => {
    if (!secret || !client_id || !redirecturl || !webhook) {
        console.log("Please fill out config.json!");
        process.exit(1);
      }
}

module.exports = {
    Check
};