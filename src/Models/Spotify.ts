import axios from "axios";
import qs from "qs";

const client_id = "8b783d584d454dc6abbaf00ed64bebad";
const client_secret = "8ec65ef5aae541859a0fb96789ebffaa";

export class SpotifyWebApi {
  constructor(private accessToken: string, private refresh_token: string) {
    this.accessToken = accessToken;
    this.refresh_token = refresh_token;

  }



  public async getCurrentlyPlaying() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        headers
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      console.log("in here")
    }
  }
}
