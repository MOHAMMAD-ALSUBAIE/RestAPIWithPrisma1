/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ISBN` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `booksISBN` on the `favoritebooks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `favoritebooks` DROP FOREIGN KEY `FavoriteBooks_booksISBN_fkey`;

-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    MODIFY `ISBN` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ISBN`);

-- AlterTable
ALTER TABLE `favoritebooks` MODIFY `booksISBN` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FavoriteBooks` ADD CONSTRAINT `FavoriteBooks_booksISBN_fkey` FOREIGN KEY (`booksISBN`) REFERENCES `Books`(`ISBN`) ON DELETE RESTRICT ON UPDATE CASCADE;
