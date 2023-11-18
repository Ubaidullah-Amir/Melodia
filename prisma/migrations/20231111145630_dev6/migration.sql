/*
  Warnings:

  - The primary key for the `PlayList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PlayList` table. All the data in the column will be lost.
  - The primary key for the `Preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Preference` table. All the data in the column will be lost.
  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Song` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `PlayList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playlistName,userId]` on the table `PlayList` will be added. If there are existing duplicate values, this will fail.
  - The required column `playlistId` was added to the `PlayList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `playlistName` to the `PlayList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PlayList` table without a default value. This is not possible if the table is not empty.
  - The required column `preferenceId` was added to the `Preference` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `songId` was added to the `Song` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_PlayListToSong" DROP CONSTRAINT "_PlayListToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListToSong" DROP CONSTRAINT "_PlayListToSong_B_fkey";

-- DropIndex
DROP INDEX "PlayList_name_key";

-- AlterTable
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "playlistId" TEXT NOT NULL,
ADD COLUMN     "playlistName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "PlayList_pkey" PRIMARY KEY ("playlistId");

-- AlterTable
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_pkey",
DROP COLUMN "id",
ADD COLUMN     "preferenceId" TEXT NOT NULL,
ADD CONSTRAINT "Preference_pkey" PRIMARY KEY ("preferenceId");

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
DROP COLUMN "id",
ADD COLUMN     "songId" TEXT NOT NULL,
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("songId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayList_userId_key" ON "PlayList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayList_playlistName_userId_key" ON "PlayList"("playlistName", "userId");

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayList"("playlistId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayListToSong" ADD CONSTRAINT "_PlayListToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("songId") ON DELETE CASCADE ON UPDATE CASCADE;
