"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookByID = exports.getAllBooks = void 0;
const client_1 = require("@prisma/client");
const bookClient = new client_1.PrismaClient().books;
//getAllAuthors
const getAllBooks = async (req, res) => {
    try {
        const authors = await bookClient.findMany({
            include: {
                author: true,
            },
        });
        res.status(200).json({ data: authors });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getAllBooks = getAllBooks;
//getAuthorById
const getBookByID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await bookClient.findUnique({
            where: {
                id: id,
            },
        });
        result
            ? res.status(200).json({ data: result })
            : res.status(404).json({ status: 404, message: "Not Found" });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getBookByID = getBookByID;
//createAuthor
const createBook = async (req, res) => {
    try {
        const { title = null, authorID = null } = req.body;
        const result = badRequest(title, authorID, res); //let id argument to true because new user not have id
        if (result) {
            return;
        }
        const response = await createBookLogics(title.trim(), authorID.trim());
        res.status(201).json({ data: response });
    }
    catch (e) {
        console.log(e);
    }
};
exports.createBook = createBook;
//updateAuthor
const updateBook = async (req, res) => {
    try {
        const { title = null, id = null } = req.body;
        const result = badRequest(true, id, res);
        if (result) {
            return;
        }
        const response = await bookClient.update({
            where: { id: id },
            data: {
                title: title,
            },
        });
        res.status(200).json({
            status: "Success",
            data: {
                response,
            },
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.updateBook = updateBook;
//deleteAuthor
const deleteBook = async (req, res) => {
    try {
        const { id } = req.body;
        const booksResponse = await bookClient.deleteMany({
            where: {
                id: id,
            },
        });
        booksResponse.count
            ? res.status(200).json({
                data: { booksRemoved: booksResponse },
            })
            : res.status(404).json({
                status: "Failed",
                message: `Book with id " ${id} " not exist`,
            });
    }
    catch (e) {
        console.log(e);
    }
};
exports.deleteBook = deleteBook;
async function createBookLogics(title, id) {
    return await bookClient.create({
        data: {
            title: title,
            authorId: id,
        },
    });
}
function badRequest(title, id, res) {
    if (!title || !id) {
        res.status(400).json({
            status: "bad Request",
            message: "Require information is missing",
        });
        return true;
    }
    return false;
}
//# sourceMappingURL=book.controller.js.map