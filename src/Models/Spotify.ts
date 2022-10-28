import axios from "axios";
import qs from "qs";
import { DBclient } from "./Database";

const client_id = "8b783d584d454dc6abbaf00ed64bebad";
const client_secret = "8ec65ef5aae541859a0fb96789ebffaa";

class SpotifyWebApi {
  
  
  //gereral Headers for the spotify WEB api
  private Headers(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  //a medhod to refresh the accessToken if we get a 401 and push it to the DB
  private async refreshToken(channelID: number, refreshToken: string) {
    const headers = {
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
      refresh_token: refreshToken,
    };

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      );

      const accescToken = response.data.access_token;
      DBclient.updateSpotifyToken(channelID, accescToken);

      console.log(response.data)
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  public async getCurrentlyPlaying(channelID: number) {
    let spotifyData = await DBclient.getSpotify(channelID);
    if (!spotifyData) {
      return 401;
    }
    try {
      let accessToken = spotifyData.accessToken;
      console.log(accessToken)

      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: this.Headers(accessToken),
        }
      );
      return {
        track: response.data.item.name,
        artists: response.data.item.artists,
      };
    } catch (error: any) {
      console.log("yup we in here");
      
      if (error.response.data.error.status === 401) {
        this.refreshToken(channelID, spotifyData.refreshToken);
      }
      else{
        console.log(error.response.data)
      }
    }
  }
}

const spotifyClient = new SpotifyWebApi();

export { spotifyClient };
