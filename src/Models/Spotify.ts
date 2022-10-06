import axios from "axios";
import qs from "qs";

const client_id = "8b783d584d454dc6abbaf00ed64bebad";
const client_secret = "8ec65ef5aae541859a0fb96789ebffaa";

export class SpotifyWebApi {
  constructor(private accessToken: string, private refresh_token: string) {
    this.accessToken = accessToken;
    this.refresh_token = refresh_token;

    this.refreshAccessToken();
  }

  private refreshAccessToken() {
    //create a 1 hour interval to refresh the access token
    setInterval(async () => {
      console.log("refreshing access token");

      const headers: any = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: client_id,
          password: client_secret,
        },
      };
      const data = {
        grant_type: "refresh_token",
        refresh_token: this.refresh_token,
      };
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        );
        this.accessToken = response.data.access_token;
      } catch (error) {
        console.log(error);
      }
      console.log("access token refreshed");
    }, 3600000);
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
