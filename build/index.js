"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_route_1 = __importDefault(require("./routes/author.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)()).set("Content-Security-Policy", "default-src 'self'");
app.use(express_1.default.json());
app.use("/authors", author_route_1.default);
app.use("/authors/2", author_route_1.default);
app.use("/authors/addAuthor", author_route_1.default);
app.use("/authors/updateAuthorName", author_route_1.default);
app.use("/authors/removeAuthor", author_route_1.default);
app.use("/books", book_route_1.default);
app.use("/books/2", book_route_1.default);
app.use("/books/addBook", book_route_1.default);
app.use("/books/updateBookName", book_route_1.default);
app.use("/books/removeBook", book_route_1.default);
app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html")
        .set("Content-Security-Policy", "default-src 'self'")
        .send("<h1>Test The Rest Api using postman</h2>");
});
app.listen(port, () => {
    console.log(`Server Up and running on  port ${port}`);
});
//# sourceMappingURL=index.js.map