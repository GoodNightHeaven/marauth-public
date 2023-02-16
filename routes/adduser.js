const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const config = require("../config.json");
const password = config.database.password;

const client = new MongoClient(config.mongodb.connectionstring, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
router.get("/add", async (req, res) => {
  const compulsoryParams = ["apiKey", "webhook", "password"];
  const missingParam = compulsoryParams.some(param => req.query[param] === undefined);
  
  if (missingParam) {
    res.status(400).send(`Missing compulsory parameter: ${compulsoryParams.find(param => req.query[param] === undefined)}`);
    return;
  }

  if (req.query.password !== password) {
    res.status(401).send("Invalid password");
    return;
  }
  try {
    addUser(req.query.apiKey, req.query.webhook);
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("User already exists");
  }
});

async function addUser(apikey, webhook) {
  try {
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("users");
    await collection.updateOne(
      { apiKey: apikey },
      { $set: { redirect: null, webhook: webhook } },
      { upsert: true }
    );
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = router;