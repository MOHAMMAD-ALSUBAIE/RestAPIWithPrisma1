"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_controller_1 = require("../controllers/author.controller");
const authorRouter = (0, express_1.Router)();
authorRouter.get("/", author_controller_1.getAllAuthors);
authorRouter.get("/:id", author_controller_1.getAuthor);
authorRouter.post("/addAuthor", author_controller_1.createAuthor);
authorRouter.post("/addAuthor", author_controller_1.createAuthor);
authorRouter.patch("/updateAuthorName", author_controller_1.updateAuthor);
authorRouter.delete("/removeAuthor", author_controller_1.deleteAuthor);
exports.default = authorRouter;
//# sourceMappingURL=author.route.js.map