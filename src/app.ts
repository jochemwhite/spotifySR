import express from "express";
import bodyParser from "body-parser";
import { Client } from "./Models/TwitchIRC";
import { SpotifyClient } from "./Controllers/spotify";

import spotify from "./Routes/spotify";
import twitch from "./Routes/twitch";

const app = express();

app.use(bodyParser.json());

app.use("/spotify", spotify);
app.use("/twitch", twitch);

app.listen(8888, () => {
  console.log("Listening on port 8888");
  console.log("http://localhost:8888/spotify/login");
});



Client.onMessage(async (message, user) => {
  console.log(user + ": " + message);

  if (message === "!song") {
    Client.send_message('Jochemwhite', `hello ${user}`)
  }
});
