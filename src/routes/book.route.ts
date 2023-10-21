import { Router } from "express";
import {
    getAllBooks,
    getBookByID,
    updateBook,
    deleteBook,
} from "../controllers/book.controller";

const bookRouter = Router();
bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookByID);
bookRouter.patch("/updateBookName", updateBook);
bookRouter.delete("/removeBook", deleteBook);

export default bookRouter;
