/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AuthorToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToMovie" DROP CONSTRAINT "_AuthorToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToMovie" DROP CONSTRAINT "_AuthorToMovie_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "_AuthorToMovie";

-- CreateTable
CREATE TABLE "Cast" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CastToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cast_role_id_key" ON "Cast"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CastToMovie_AB_unique" ON "_CastToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CastToMovie_B_index" ON "_CastToMovie"("B");

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToMovie" ADD CONSTRAINT "_CastToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToMovie" ADD CONSTRAINT "_CastToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
