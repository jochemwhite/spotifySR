import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

class TwitchAPI {
  API: string;
  clientID: string;

  constructor() {
    this.API = process.env.TWITCHAPI;
    this.clientID = process.env.TWITCH_CLIENT_ID;
  }

  private Headers(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": this.clientID,
    };
  }

  async GetUsers(accessToken: string, userID: number) {
    try {
      let res = await axios.get(`${this.API}/users?id=${userID}`, {
        headers: this.Headers(accessToken),
      });

      return res.data.data[0];
    } catch (err: any) {
      console.log(err);

      return "something when wrong";
    }
  }
}

const twitchAPI = new TwitchAPI();

export { twitchAPI };
