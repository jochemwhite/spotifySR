import axios from "axios";
import { spotifyAPI } from "../axios/axios";
import qs from "qs";
import { DBclient } from "./Database";

const client_id = "8b783d584d454dc6abbaf00ed64bebad";
const client_secret = "8ec65ef5aae541859a0fb96789ebffaa";

class SpotifyWebApi {
  //gereral Headers for the spotify WEB api

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

      const acccessToken = response.data.access_token;
      await DBclient.updateSpotifyToken(channelID, acccessToken);

      return acccessToken;
    } catch (error) {
      console.log(error);
    }
  }

  //fetching the data
  private async fetchData(endpoint: string, accessToken: string) {
    let response: any = await spotifyAPI.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }

  private async postData(endpoint: string, accessToken: string) {
    let response: any = await spotifyAPI.post(endpoint, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }

  //trying to fetch data using the fetch data method if we get a 401 we are refreshing the token and fetch the endpoint agian
  private async handleRequest(
    endpoint: string,
    channelID: number,
    method: string
  ) {
    let spotifyData = await DBclient.getSpotify(channelID);
    if (!spotifyData || !spotifyData.accessToken) {
      return null;
    }

    let response: any;
    switch (method) {
      case "get":
        response = await this.fetchData(endpoint, spotifyData.accessToken);
        break;
      case "post":
        console.log('in here')
        response = await this.postData(endpoint, spotifyData.accessToken);
        break;
    }

    if (response === 401) {
      let newToken = await this.refreshToken(
        channelID,
        spotifyData.refreshToken
      );
      response = await this.fetchData(endpoint, newToken);
    }
    return response;
  }

  //get the song that the user is currently playing
  public async getCurrentlyPlaying(channelID: number) {
    const data = await this.handleRequest(
      "/me/player/currently-playing",
      channelID,
      "get"
    );
    if (data === "") {
      return null;
    }

    console.log(data);
    return {
      track: data.item.name,
      artists: data.item.artists,
    };
  }

  public async addSongtoQueue(channelID: number, uri: string) {
    const data = await this.handleRequest(
      `/me/player/queue?uri=${uri}`,
      channelID,
      "post"
    );
    // console.log(data)
  }
}

const spotifyClient = new SpotifyWebApi();

export { spotifyClient };
