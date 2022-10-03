import { chatClient } from "../API/TwitchAPI.js";
import spotifyApi from "../API/SpotifyAPI.js";

chatClient.onMessage(async (channel, user, message) => {
  //deconstruct the message
  const commandName = message.trim();
  let parts = commandName.split(" ");
  let command = parts[0];
  let array = parts.splice(parts.indexOf(parts[1]));
  let msg = array.join(" ");

  console.log(msg)

  if (command === "!song") {
    const song = await spotifyApi.getMyCurrentPlayingTrack();

    if (song !== undefined) {
      chatClient.say(
        channel,
        `/me ${song.body.item.name} - ${song.body.item.artists[0].name}`
      );
    } else {
      chatClient.say(channel, `@${user} No song playing or we broke the bot`);
    }
  } else if (command === "!songurl") {
    const song = await spotifyApi.getMyCurrentPlayingTrack();
    if (song !== undefined) {
      chatClient.say(channel, `${song.body.item.external_urls.spotify}`);
    } else {
      chatClient.say(channel, `@${user} No song playing or we broke the bot`);
    }
  } else if (command === "!sr") {
     if (msg.includes("spotify:")) {
      spotifyApi.addToQueue(msg);
      chatClient.say(channel, `het liedje is toegevoegd aan de wachtrij`);
    }
    else if (msg.includes("https://open.spotify.com")) {
      var uri = msg.substring(31, 53);
      spotifyApi.addToQueue(`spotify:track:${uri}`);

      chatClient.say(channel, `het liedje is toegevoegd aan de wachtrij`);
    } else {
      spotifyApi.searchTracks(msg, { limit: "1" }).then(
        function (data) {
          var track = data["body"]["tracks"]["items"][0]["uri"];
          var song = data["body"]["tracks"]["items"][0]["name"];

          console.log(song);

          spotifyApi.addToQueue(track);
          chatClient.say(
            channel,
            `het liedje ${song} is toegevoegd aan de wachtrij`
          );
        },
        function (err) {
          console.error(err);
        }
      );
    }
  }
});
