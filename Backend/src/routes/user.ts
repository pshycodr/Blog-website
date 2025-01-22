import { Hono } from "hono";

import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, sign, verify } from "hono/jwt";

import { signupInput } from "@pshycodr/medium-common/dist";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

userRouter.use("/validation", async (c, next) => {
    const header = c.req.header("authorization");

    if (!header || !header.startsWith("Bearer ")) {
        c.status(401);
        return c.json({ error: "Unauthorized: Missing or malformed token" });
    }

    const token = header.split(" ")[1];

    try {
        const response = await verify(token, c.env.JWT_SECRET);

        if (response.id) {
            c.set("userId", String(response.id));
            return await next();
        }
        throw new Error("Invalid token payload");
    } catch (e: any) {
        console.error("Token verification failed:", e.message);
        c.status(403);
        return c.json({ error: "Unauthorized: Token verification failed" });
    }
});

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "invalid response",
        });
    }

    // console.log("JWT_SECRET:", c.env.JWT_SECRET);
    // console.log("Request Body:", body);

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.username,
                password: body.password,
            },
            select: {
                id: true,
                name: true,
            },
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            message: "user registered successfully",
            jwt,
            user,
        });
        
    } catch (error) {
        c.status(403);
        console.error(error);
        return c.json({ error: "error while signing up" });
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.user.findUnique({
        where: {
            email: body.username,
            password: body.password,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
        message: "User signed in successfully!",
        jwt,
        user,
    });
});

userRouter.get('/validation', async(c) => {
    c.status(200)
    return c.json({
        message : true
    })
})