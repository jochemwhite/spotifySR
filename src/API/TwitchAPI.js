import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import { promises as fs } from "fs";
import { readFile } from "fs/promises";

const json = JSON.parse(
  await readFile(new URL("../config.json", import.meta.url))
);

const clientId = json.twitch.clientID;
const clientSecret = json.twitch.clientSecret;
const tokenData = JSON.parse(await fs.readFile("./tokens.json", "UTF-8"));
const authProvider = new RefreshingAuthProvider(
  {
    clientId,
    clientSecret,
    onRefresh: async (newTokenData) =>
      await fs.writeFile(
        "./tokens.json",
        JSON.stringify(newTokenData, null, 4),
        "UTF-8"
      ),
  },
  tokenData
);

const chatClient = new ChatClient({
  authProvider,
  channels: ['Jochemwhite'],
});
await chatClient.connect();


export { chatClient };