import { PrismaClient } from "@prisma/client";
const bookClient = new PrismaClient().books;

//getAllAuthors

export const getAllBooks = async (req, res) => {
    try {
        const books = await bookClient.findMany({
            take: 10,
        });
        res.status(200).json({ data: books });
    } catch (e) {
        console.log(e);
    }
};

//getAuthorById
export const getBookByID = async (req, res) => {
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
    } catch (e) {
        console.log(e);
    }
};
//createAuthor
// export const createBook = async (req, res) => {
//     try {
//         const { title = null, authorID = null } = req.body;
//         const result = badRequest(title, authorID, res); //let id argument to true because new user not have id
//         if (result) {
//             return;
//         }
//         const response = await createBookLogics(title.trim(), authorID.trim());

//         res.status(201).json({ data: response });
//     } catch (e) {
//         console.log(e);
//     }
// };
//updateAuthor
export const updateBook = async (req, res) => {
    try {
        const { title = null, id = null } = req.body;
        const result = badRequest(true, id, res);
        if (result) {
            return;
        }
        const response = await bookClient.update({
            where: { id: id },
            data: {
                BookTitle: title,
            },
        });
        res.status(200).json({
            status: "Success",
            data: {
                response,
            },
        });
    } catch (e) {
        console.log(e);
    }
};
//deleteAuthor
export const deleteBook = async (req, res) => {
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
    } catch (e) {
        console.log(e);
    }
};

// async function createBookLogics(title: string, id: string) {
//     return await bookClient.create({
//         data: {
//             I: title,
//             authorId: id,
//         },
//     });
// }

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
