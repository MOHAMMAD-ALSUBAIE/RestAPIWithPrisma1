"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthor = exports.getAllAuthors = void 0;
const client_1 = require("@prisma/client");
const authorClient = new client_1.PrismaClient().author;
const bookClient = new client_1.PrismaClient().books;
//getAllAuthors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await authorClient.findMany({
            include: {
                Books: true,
            },
        });
        res.status(200).json({ data: authors });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getAllAuthors = getAllAuthors;
//getAuthorById
const getAuthor = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await authorClient.findUnique({
            where: {
                id: id,
            },
            include: {
                Books: true,
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
exports.getAuthor = getAuthor;
//createAuthor
const createAuthor = async (req, res) => {
    try {
        const { name = null, bookTitle = null } = req.body;
        console.log(req.body);
        const result = badRequest(name, true, res); //let id argument to true because new user not have id
        if (result) {
            return;
        }
        const response = await createAuthorLogics(name.trim(), bookTitle === null || bookTitle === void 0 ? void 0 : bookTitle.trim());
        res.status(201).json({ data: response });
    }
    catch (e) {
        console.log(e);
    }
};
exports.createAuthor = createAuthor;
//updateAuthor
const updateAuthor = async (req, res) => {
    try {
        const { name = null, id = null } = req.body;
        const result = badRequest(name, id, res);
        if (result) {
            return;
        }
        const response = await authorClient.update({
            where: { id: id },
            data: {
                name: name,
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
exports.updateAuthor = updateAuthor;
//deleteAuthor
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.body;
        const booksResponse = await bookClient.deleteMany({
            where: {
                authorId: id,
            },
        });
        const authorResponse = await authorClient.deleteMany({
            where: {
                id: id,
            },
        });
        authorResponse.count
            ? res.status(200).json({
                data: { author: authorResponse, booksRemoved: booksResponse },
            })
            : res.status(404).json({ data: "Author not exist" });
    }
    catch (e) {
        console.log(e);
    }
};
exports.deleteAuthor = deleteAuthor;
async function createAuthorLogics(name, bookTitle) {
    let response;
    if (bookTitle) {
        response = await authorClient.create({
            data: {
                name: name,
                Books: {
                    create: {
                        title: bookTitle.trim(),
                    },
                },
            },
        });
    }
    else {
        response = await authorClient.create({
            data: {
                name: name,
            },
        });
    }
    return response;
}
function badRequest(name, id, res) {
    if (!name || !id) {
        res.status(400).json({
            status: "bad Request",
            message: "Require information is missing",
        });
        return true;
    }
    return false;
}
//# sourceMappingURL=author.controller.js.map