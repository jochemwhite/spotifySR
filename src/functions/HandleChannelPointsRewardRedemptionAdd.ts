import { appwriteAPI } from "../classes/appwrite";
import type { ChannelPointsCustomRewardRedemptionAddEvent } from "../types/eventsub";

export async function HandleChannelPointsRewardRedemptionAdd(event: ChannelPointsCustomRewardRedemptionAddEvent) {
  console.log(`[${event.broadcaster_user_name}] ${event.user_name} redeemed ${event.reward.id} for ${event.reward.cost} points`);

  



}
