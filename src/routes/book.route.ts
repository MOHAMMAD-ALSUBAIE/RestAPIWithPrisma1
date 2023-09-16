import { Router } from "express";
import {
    getAllBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/book.controller";

const bookRouter = Router();
bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookByID);
bookRouter.post("/addBook", createBook);
bookRouter.patch("/updateBookName", updateBook);
bookRouter.delete("/removeBook", deleteBook);

export default bookRouter;
