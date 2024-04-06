import { EventsubAPI } from "./classes/twitch-eventsub";

async function Main(channelID: string) {
  const res = await EventsubAPI.createEventSubSubscription({
    type: "channel.chat.message",
    version: "1",
    condition: {
      broadcaster_user_id: channelID.toString(),
      user_id: channelID.toString(),
    },
    transport: {
      method: "conduit",
      conduit_id: "6086cbaa-0bc0-4564-8d01-6bb898269e2c",
    },
  });

}

Main("122604941")