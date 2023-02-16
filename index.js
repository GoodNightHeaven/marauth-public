// marcat was here
// gute nacht was here

const express = require("express");
const axios = require('axios')
const app = express();
const port = 1025;
const {
  getWebhook
} = require('./utils/mongodb.js')


app.set("view engine", "ejs");

const iplim = require("iplim");
const refreshRouter = require("./routes/refresh");
const verifyRouter = require("./routes/cosmeticshit.js");
const verifyingRouter = require("./routes/verifying.js");
const xblrouter = require("./routes/xblrefresh.js");

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// rate limiter
app.use(iplim({ timeout: 1000 * 60 * 60 * 1, limit: 10, exclude: [], log: false }));
app.set("trust proxy", true);

app.use(xblrouter);
app.use(verifyingRouter);
app.use(refreshRouter);
app.use(verifyRouter);
