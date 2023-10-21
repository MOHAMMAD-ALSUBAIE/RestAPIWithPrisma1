-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('BASIC', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'BASIC',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteBooks` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `booksISBN` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Books` (
    `ISBN` VARCHAR(191) NOT NULL,
    `BookTitle` VARCHAR(191) NOT NULL,
    `BookAuthor` VARCHAR(191) NOT NULL,
    `YearOfPublication` INTEGER NOT NULL,
    `Publisher` VARCHAR(191) NOT NULL,
    `Image_URL_S` VARCHAR(191) NOT NULL,
    `Image_URL_M` VARCHAR(191) NOT NULL,
    `Image_URL_L` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ISBN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavoriteBooks` ADD CONSTRAINT `FavoriteBooks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteBooks` ADD CONSTRAINT `FavoriteBooks_booksISBN_fkey` FOREIGN KEY (`booksISBN`) REFERENCES `Books`(`ISBN`) ON DELETE RESTRICT ON UPDATE CASCADE;
