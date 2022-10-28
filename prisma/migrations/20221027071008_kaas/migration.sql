-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JWT` (
    `id` VARCHAR(191) NOT NULL,
    `twitch` VARCHAR(200) NULL,
    `spotify` VARCHAR(200) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `JWT_twitch_key`(`twitch`),
    UNIQUE INDEX `JWT_spotify_key`(`spotify`),
    UNIQUE INDEX `JWT_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Twitch` (
    `id` VARCHAR(191) NOT NULL,
    `twitchID` INTEGER NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `IRC` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Twitch_twitchID_key`(`twitchID`),
    UNIQUE INDEX `Twitch_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spotify` (
    `id` VARCHAR(191) NOT NULL,
    `spotifyID` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(350) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `twitchID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Spotify_spotifyID_key`(`spotifyID`),
    UNIQUE INDEX `Spotify_accessToken_key`(`accessToken`),
    UNIQUE INDEX `Spotify_userId_key`(`userId`),
    UNIQUE INDEX `Spotify_twitchID_key`(`twitchID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Queue` (
    `id` VARCHAR(191) NOT NULL,
    `channelID` INTEGER NOT NULL,
    `channelName` VARCHAR(191) NOT NULL,
    `spotifyId` VARCHAR(191) NOT NULL,
    `song` VARCHAR(191) NOT NULL,
    `songID` VARCHAR(191) NOT NULL,
    `artists` VARCHAR(191) NOT NULL,
    `requestedBy` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL,
    `twitchId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JWT` ADD CONSTRAINT `JWT_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Twitch` ADD CONSTRAINT `Twitch_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spotify` ADD CONSTRAINT `Spotify_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spotify` ADD CONSTRAINT `Spotify_twitchID_fkey` FOREIGN KEY (`twitchID`) REFERENCES `Twitch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_twitchId_fkey` FOREIGN KEY (`twitchId`) REFERENCES `Twitch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
