import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DB {
  constructor() {}

  //get all the members that needs to join the twitch IRC on startup
  async getIRCmembers() {
    const users = prisma.twitch.findMany({
      where: {
        IRC: true,
      },
      select: {
        displayName: true,
      },
    });
    return users;
  }

  //add a user that needs added to the IRC startup
  async joinIRC(ID: number) {
    let res = await prisma.twitch.update({
      where: {
        twitchID: ID,
      },
      data: {
        IRC: true,
      },
    });
    return res;
  }

  //remove a user from the IRC startup
  async leaveIRC(ID: number) {
    let res = await prisma.twitch.update({
      where: {
        twitchID: ID,
      },
      data: {
        IRC: false,
      },
    });
  }

  //get user ID based of TwitchChannelID
  private async getUser(TwitchID: number) {
    try {
      let user = await prisma.twitch.findUnique({
        where: {
          twitchID: TwitchID,
        },
        select: {
          userId: true,
        },
      });
      return user!.userId;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //get accescToken based of twitch channelID
  async getSpotify(channelID: number) {
    let ID: any = await this.getUser(channelID);

    const response = await prisma.spotify.findUnique({
      where: {
        userId: ID,
      },
      select: {
        accessToken: true,
        refreshToken: true,
      },
    });
    if (!response || !ID) {
      return false;
    }

    return response;
  }

  //update Spotify AccessToken
  async updateSpotifyToken(channelID: number, accescToken: string) {
    let ID: any = await this.getUser(channelID);

    console.log("updating database");
    await prisma.spotify.update({
      where: {
        userId: ID,
      },
      data: {
        accessToken: accescToken,
      },
    });
    return;
  }
}

const DBclient = new DB();

export { DBclient };
