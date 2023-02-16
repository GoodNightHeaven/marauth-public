const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../config.json");
const stateequalsurl = config.azure.stateequalsurl;

router.get("/verify", async (req, res) => {

  apiKey = req.query.apiKey;
  verifyurl = `${stateequalsurl}${apiKey}`;
  res.redirect(verifyurl);

});

router.get('/ilovemarcat', async (req, res) => {
  res.render('refreshed/hackertext', { title: 'marcat', textsize: '20' });
});

router.get('/deletewebhook', async (req, res) => {
  if (!req.query.webhook) return
  if (!req.query.webhook.startsWith('https://discord')) return
  try {
    const response = await axios.delete(`${req.query.webhook}`).catch(console.error());
    if (response) return res.render('refreshed/hackertext', { title: 'Webhook Deleted', textsize: '10' });
  } catch (err) {}
})

router.all('*', (req, res) => {
  res.render(('refreshed/404page'), { title: `404`, textsize: "20" })
})

module.exports = router;
