-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "forgotpasswordtoken" TEXT,
    "forgotpasswordtokenexpiry" TIMESTAMP(3),
    "verifyemailtoken" TEXT,
    "verifyemailtokenexpiry" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "preferenceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("preferenceId")
);

-- CreateTable
CREATE TABLE "PlayList" (
    "playlistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistName" TEXT NOT NULL,

    CONSTRAINT "PlayList_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "Song" (
    "songId" TEXT NOT NULL,
    "songUrl" TEXT NOT NULL,
    "songName" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("songId")
);

-- CreateTable
CREATE TABLE "_PlayListToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayList_playlistName_userId_key" ON "PlayList"("playlistName", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_songUrl_key" ON "Song"("songUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Song_songName_key" ON "Song"("songName");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayListToSong_AB_unique" ON "_PlayListToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayListToSong_B_index" ON "_PlayListToSong"("B");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayList"("playlistId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("songId") ON DELETE CASCADE ON UPDATE CASCADE;
