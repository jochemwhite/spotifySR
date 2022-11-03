import express from "express";
import bodyParser from "body-parser";
import "./commands";
import spotify from "./Routes/spotify";
import twitch from "./Routes/twitch";
import "./Models/Websocket";

const app = express();

app.use(bodyParser.json());

app.use("/spotify", spotify);
app.use("/twitch", twitch);

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
