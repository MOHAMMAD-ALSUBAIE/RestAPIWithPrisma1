import express from "express";
import authorRouter from "./routes/author.route";
import bookRouter from "./routes/book.route";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3000;
app.use(cors()).set("Content-Security-Policy", "default-src 'self'");
app.use(express.json());

app.use("/authors", authorRouter);
app.use("/authors/2", authorRouter);
app.use("/authors/addAuthor", authorRouter);
app.use("/authors/updateAuthorName", authorRouter);
app.use("/authors/removeAuthor", authorRouter);

app.use("/books", bookRouter);
app.use("/books/2", bookRouter);
app.use("/books/addBook", bookRouter);
app.use("/books/updateBookName", bookRouter);
app.use("/books/removeBook", bookRouter);

app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html")
        .set("Content-Security-Policy", "default-src 'self'")
        .send("<h1>Test The Rest Api using postman</h2>");
});

app.listen(port, () => {
    console.log(`Server Up and running on  port ${port}`);
});
