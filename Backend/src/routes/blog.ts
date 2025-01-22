import { Hono } from "hono";

import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

// Middleware
blogRouter.use("/*", async (c, next) => {
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

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { title, content, published } = await c.req.json();

        const authorId = c.get("userId");

        if (!authorId) {
            c.status(401);
            return c.json({ error: "Unauthorized. User ID is missing." });
        }

        const blog = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId,
            },
        });

        return c.json({ message: "Blog created successfully!", blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        c.status(500);
        return c.json({ error: "Failed to create blog post." });
    }
});

blogRouter.put("/blog", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { title, content, published, id } = await c.req.json();

        if (!id || !title || !content) {
            c.status(400);
            return c.json({
                error: "Invalid request. Missing required fields.",
            });
        }

        const authorId = c.get("userId")

        const updatedBlog = await prisma.post.update({
            where: { id, authorId },
            data: { title, content, published },
        });

        c.status(200);
        return c.json({
            message: "Blog updated successfully!",
            blog: updatedBlog,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        c.status(500);
        return c.json({ error: "Failed to update blog post." });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        // log: ["query", "info", "warn", "error"],
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        // console.log(blogs);
        c.status(200);
        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        c.status(500);
        return c.json({ error: "Failed to fetch blog posts." });
    }
});

blogRouter.get("/my-blogs", async (c) => {
    const prisma = new PrismaClient({
        // log: ["query", "info", "warn", "error"],
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const authorId = c.get("userId");
        console.log(authorId);
        const blogs = await prisma.post.findMany({
            where: {
                published: true,
                authorId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        // console.log(blogs);
        c.status(200);
        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        c.status(500);
        return c.json({ error: "Failed to fetch blog posts." });
    }
});

blogRouter.get("/draft", async (c) => {
    const prisma = new PrismaClient({
        // log: ["query", "info", "warn", "error"],
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const authorId = c.get("userId");
        const blogs = await prisma.post.findMany({
            where: {
                published: false,
                authorId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        // console.log(blogs);
        c.status(200);
        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        c.status(500);
        return c.json({ error: "Failed to fetch blog posts." });
    }
});

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.get("userId");
        if (!userId) {
            c.status(401);
            return c.json({ error: "Unauthorized. User ID is missing." });
        }

        const blogId = (c.req as any).param("id");

        const blogs = await prisma.post.findMany({
            where: {
                id: blogId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        c.status(200);
        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        c.status(500);
        return c.json({ error: "Failed to fetch blog posts." });
    }
});
