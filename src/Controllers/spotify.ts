import axios from "axios";
import { RequestHandler } from "express";
import { SpotifyWebApi } from "../Models/Spotify";
import qs from "qs";

const client_id = "8b783d584d454dc6abbaf00ed64bebad";
const client_secret = "8ec65ef5aae541859a0fb96789ebffaa";
const redirect_uri = "http://localhost:8888/spotify/callback";

const Login: RequestHandler = (req, res) => {
  var scope = "user-read-private user-read-email user-read-currently-playing";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
};

let SpotifyClient: SpotifyWebApi;

//create post request to get access token
const Callback: RequestHandler = async (req, res) => {
  const code = req.query.code || null;

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
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    let access_token = response.data.access_token;
    let refresh_token = response.data.refresh_token;

    res.send("success");

    SpotifyClient = new SpotifyWebApi(access_token, refresh_token);

    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export { Login, Callback, SpotifyClient };
