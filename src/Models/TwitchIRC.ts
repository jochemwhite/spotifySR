import handleMessage from "../Functions/TwitchMessageParser";
import WebSocket from "ws";
// import parseMessage from "../Functions/TwitchMessageParser";

export class ChatClient {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    this.connect();
    // this.message();
  }

  //conntect to twitch IRC
  connect() {
    this.socket.on("open", () => {
      console.log("Connected to Twitch IRC");

      this.send(
        "CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership"
      );
      this.send("PASS oauth:wt7sxf77jnhdi8hlrowvtd5sy431b6");
      this.send("NICK jochemwhite");
    });
  }

  //sending a RAW message the the IRC
  private send(message: string) {
    this.socket.send(message);
  }

  join(channel: string) {
    this.send(`JOIN #${channel}`);

    this.send_message(channel, "Jochemwhite has joined your chat")
  }

  //send message to specific chat room
  send_message(channel: string, message: string) {
    this.send(`PRIVMSG #${channel} :${message}`);
  }

  async onMessage(callback: (message: string, user: string) => void) {
    this.socket.on("message", async (ircMessage: any) => {
      let msg = ircMessage.toString();
      let object: any = await handleMessage(msg);
      // console.log(object);

      // if (object.command.command === "PING") {
      //   this.send("PONG :tmi.twitch.tv");
      // }

      try {
        if (object.command.command === "PRIVMSG") {
          let user = object.tags["display-name"];
          let message = object.parameters;

          callback(message, user);
        }
      } catch (e) {
        return;
      }
    });
  }
}

const Client = new ChatClient();

export { Client };
