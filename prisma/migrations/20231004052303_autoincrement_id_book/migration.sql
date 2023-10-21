/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ISBN` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `booksISBN` on the `favoritebooks` table. All the data in the column will be lost.
  - Added the required column `id` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booksID` to the `FavoriteBooks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favoritebooks` DROP FOREIGN KEY `FavoriteBooks_booksISBN_fkey`;

-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    DROP COLUMN `ISBN`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `favoritebooks` DROP COLUMN `booksISBN`,
    ADD COLUMN `booksID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FavoriteBooks` ADD CONSTRAINT `FavoriteBooks_booksID_fkey` FOREIGN KEY (`booksID`) REFERENCES `Books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
