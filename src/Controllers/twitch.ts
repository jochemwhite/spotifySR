import axios from "axios";
import { RequestHandler } from "express";
import { twitchAPI } from "../Models/TwitchAPI";
import { Client } from "../Models/TwitchIRC";

const joinChannel: RequestHandler = async (req, res) => {
  let channelID = req.body.channelID;
  let AccessToken = req.body.accessToken;

  let userData = await twitchAPI.GetUsers(AccessToken, channelID);
  let userName = userData.login

  Client.join(userName)



  res.sendStatus(200);
};
const leaveChannel: RequestHandler = (req, res) => {};

export { joinChannel, leaveChannel };
