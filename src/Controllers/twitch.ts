import axios from "axios";
import { RequestHandler } from "express";
import { twitchAPI } from "../Models/TwitchAPI";
import { ChatClient } from "../Models/TwitchIRC";
import { DBclient } from "../Models/Database";


const joinChannel: RequestHandler = async (req, res) => {
  console.log(res)

  let channelID = req.body.channelID;
  let AccessToken = req.body.accessToken;


  let userData = await twitchAPI.GetUsers(AccessToken, channelID);
  let userName = await userData.login


  console.log(userData)

  ChatClient.join(userName)
  await DBclient.joinIRC(channelID)








  res.sendStatus(200);
};
const leaveChannel: RequestHandler = (req, res) => {};

export { joinChannel, leaveChannel };
