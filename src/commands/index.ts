import { ChatClient } from "../Models/TwitchIRC";
import dotenv from "dotenv";
import { twitchAPI } from "../Models/TwitchAPI";
import { spotifyClient } from "../Models/Spotify";
import { socket } from "../Models/Websocket";
dotenv.config();

ChatClient.onMessage(async (channel, message, user, channelID) => {
  console.log(`[${channel}] ${user}: ${message}`);

  if (message.startsWith(process.env.PREFIX)) {
    let command = message.substring(1);
    switch (command) {
      case "song":
        let data: any = await spotifyClient.getCurrentlyPlaying(channelID);
        if (!data) {
          ChatClient.send_message(
            channel,
            "/me Whoops something went wrong..."
          );
        } else {
          let stringify: string[] = data.artists.map((artist: any) => {
            return artist.name;
          });

          let artists: string = stringify.join(", ");

          ChatClient.send_message(
            channel,
            `/me playing ${data.track} by ${artists}`
          );
        }
        break;
      case "sr":
        let test = await spotifyClient.addSongtoQueue(
          channelID,
          "spotify:track:2prmhmsXOHzKDgbCELqOG6"
        );
        ChatClient.send_message(channel, "song added to queue");
        socket.send()
    }
  }
});
