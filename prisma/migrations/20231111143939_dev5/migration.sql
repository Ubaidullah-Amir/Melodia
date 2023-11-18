/*
  Warnings:

  - You are about to drop the `Cast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cinema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CastToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cast" DROP CONSTRAINT "Cast_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Cinema" DROP CONSTRAINT "Cinema_city_id_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_country_id_fkey";

-- DropForeignKey
ALTER TABLE "_CastToMovie" DROP CONSTRAINT "_CastToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_CastToMovie" DROP CONSTRAINT "_CastToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropTable
DROP TABLE "Cast";

-- DropTable
DROP TABLE "Cinema";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "_CastToMovie";

-- DropTable
DROP TABLE "_GenreToMovie";

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PlayList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "songUrl" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayListToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayList_name_key" ON "PlayList"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Song_songUrl_key" ON "Song"("songUrl");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayListToSong_AB_unique" ON "_PlayListToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayListToSong_B_index" ON "_PlayListToSong"("B");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
