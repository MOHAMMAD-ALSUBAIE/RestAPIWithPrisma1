import express from "express";
// import authorRouter from "./routes/author.route";
import bookRouter from "./routes/book.route";
import userRoute from "./routes/authentication.route";
import cors from "cors";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
const app = express();
declare module "express-session" {
    interface SessionData {
        isAuth: any;
        userID: any;
    }
}
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    expressSession({
        cookie: {
            maxAge: 60 * 60 * 1000, // ms
        },
        secret: "a santa at nasa",
        resave: false,
        saveUninitialized: true,
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);

// app.use("/authors", authorRouter);
// app.use("/authors/2", authorRouter);
// app.use("/authors/addAuthor", authorRouter);
// app.use("/authors/updateAuthorName", authorRouter);
// app.use("/authors/removeAuthor", authorRouter);

app.use("/books", bookRouter);
app.use("/books/2", bookRouter);
app.use("/books/addBook", bookRouter);
app.use("/books/updateBookName", bookRouter);
app.use("/books/removeBook", bookRouter);

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html")
        .set("Content-Security-Policy", "default-src 'self'")
        .send("<h1>Test The Rest Api using postman</h2>");
});

app.listen(port, () => {
    console.log(`Server Up and running on  port ${port}`);
});
