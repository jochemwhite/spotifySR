"use strict";

import WebSocket from "ws";

let socket = new WebSocket("wss://irc-ws.chat.twitch.tv");

socket.on("close", () => {
    console.log("Closed restarting");
    // reconnect
    
  })
  .on("open", () => {
    console.log("Opened");
  

    socket.send("PASS oauth:wt7sxf77jnhdi8hlrowvtd5sy431b6");
    socket.send("NICK jochemwhite");

    socket.send("CAP REQ :twitch.tv/commands");
    socket.send("CAP REQ :twitch.tv/tags");

    socket.send("JOIN #jochemwhite");
  })
  .on("message", (raw_data) => {
    let message = raw_data.toString().trim().split(/\r?\n/);
    // uncomment this line to log all inbounc messages
    console.log(message);
  });

setTimeout(() => {
  socket.send("PRIVMSG #jochemwhite :Hello World");
}, 2000);
