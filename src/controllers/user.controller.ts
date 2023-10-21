import { PrismaClient } from "@prisma/client";
const userPrisma = new PrismaClient().user;
const session = new PrismaClient().session;
import bcrypt from "bcrypt";

export const createUser = async (req: any, res: any) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: "Name and email are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await userPrisma.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        console.log(response);
        console.log(hashedPassword);

        res.status(201).json({
            message: "User has be created, move him to login page.",
            status: 201,
        });
    } catch (e) {
        console.log(e);
        // res.redirect("/register");

        res.status(422).json({
            message: "Error",
            status: 422,
        });
    }
};

// const a = async () => {
//     const a = await userPrisma.deleteMany();
//     console.log(a);
// };
// a();
