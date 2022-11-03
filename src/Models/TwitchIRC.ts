import handleMessage from "../Functions/TwitchMessageParser";
import WebSocket from "ws";
import dotenv from "dotenv";
import { DBclient } from "./Database";
dotenv.config();

class IRCClient {
  nickname: string;
  password: string;
  socket: WebSocket;

  constructor() {
    (this.socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443")),
      (this.nickname = process.env.BOT_NAME);
    this.password = process.env.IRC_AUTH;
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
      this.send(`PASS ${this.password}`);
      this.send(`NICK ${this.nickname}`);
      this.joinMany();
    });
  }

  //sending a RAW message to the twitch IRC server
  private send(message: string) {
    this.socket.send(message);
  }

  //join all channels where IRC is true in the database when the bot starts up
  private async joinMany() {
    let array: string[] = [];
    const users = await DBclient.getIRCmembers();
    users.map((user) => {
      array.push(`#${user.displayName.toLowerCase()}`);
    });

    this.send(`JOIN ${array.toString()}`);

    array.map((channel) => {
      this.send(`PRIVMSG ${channel} :${this.nickname} is back online`);
      console.log(`joined ${channel}`);
    });
  }

  //join a IRC chat room AKE a twitch chat
  join(channel: string) {
    this.send(`JOIN #${channel.toLowerCase()}`);
    this.send_message(channel, `${this.nickname} has joined the chat`);

    console.log(`${this.nickname} has joined ${channel}`);
  }

  //send message to specific chat room
  send_message(channel: string, message: string) {
    this.send(`PRIVMSG ${channel} :${message}`);
  }

  //listen to all incomming message
  async onMessage(
    callback: (
      channel: string,
      message: string,
      user: string,
      channelID: number
    ) => void
  ) {
    this.socket.on("message", async (ircMessage: any) => {
      let msg = ircMessage.toString();
      let object: any = await handleMessage(msg);
      if (object) {
        switch (object.command.command) {
          //callback for twitch chat messages
          case "PRIVMSG":
            let channel = object.command.channel;
            let user = object.tags["display-name"];
            let message = object.parameters;
            let channelID = +object.tags["room-id"];
            callback(channel, message, user, channelID);
            break;
          //when we get a ping
          case "PING":
            this.send("pong");
            console.log("PING PONG BITCH");
            break;
          //when we fail to authenticate with the server
          case "NOTICE":
            console.log(
              `${this.nickname} failed authenticate with the IRC server`
            );
            break;
          //when we get banned in a channel
          case "PART":
            console.log(object);
        }
      } else {
        console.log(msg);
      }
    });
  }
}

const ChatClient = new IRCClient();

export { ChatClient };
