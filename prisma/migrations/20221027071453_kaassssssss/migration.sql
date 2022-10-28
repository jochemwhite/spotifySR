/*
  Warnings:

  - You are about to drop the column `twitchID` on the `Spotify` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Spotify` DROP FOREIGN KEY `Spotify_twitchID_fkey`;

-- AlterTable
ALTER TABLE `Spotify` DROP COLUMN `twitchID`;
