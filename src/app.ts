import express from "express";
import bodyParser from "body-parser";
import { ChatClient } from "./Models/TwitchIRC";
import { SpotifyClient } from "./Controllers/spotify";

import spotify from "./Routes/spotify";

const app = express();

app.use(bodyParser.json());

app.use("/spotify", spotify);

app.listen(8888, () => {
  console.log("Listening on port 8888");
  console.log("http://localhost:8888/spotify/login");
});

let client = new ChatClient();

client.onMessage(async (message, user) => {
  let song: any = await SpotifyClient.getCurrentlyPlaying()
  console.log(user + ": " + message);

  if (message === "!song") {
    client.send_message(`@${user} is currently listening to ${song.item.name} by ${song.item.artists[0].name}`);
  }
});
