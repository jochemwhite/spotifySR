import { ChatClient } from "../Models/TwitchIRC";
import dotenv from "dotenv";
import { twitchAPI } from "../Models/TwitchAPI";
import { spotifyClient } from "../Models/Spotify";
dotenv.config();

ChatClient.onMessage(async (channel, message, user, channelID) => {
  console.log(`[${channel}] ${user}: ${message}`);

  if (message.startsWith(process.env.PREFIX)) {
    let command = message.substring(1);
    console.log(command);
    switch (command) {
      case "song":
        let data: any = await spotifyClient.getCurrentlyPlaying(channelID);
        console.log(data)
        if (!data) {
          ChatClient.send_message(
            channel,
            "/me Whoops something went wrong..."
          );
        }

        break;
    }
  }
});
