"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const noteController = {
    getAllNotes: async (req, res, next) => {
        try {
            const notes = await prisma.note.findMany();
            res.json(notes);
        }
        catch (error) {
            res.status(500).send("Error fetching notes");
        }
    },
    createNote: async (req, res, next) => {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).send("title and content fields required");
            return;
        }
        try {
            const note = await prisma.note.create({
                data: { title, content },
            });
            res.json(note);
        }
        catch (error) {
            res.status(500).send("Oops, something went wrong");
        }
    }
};
exports.default = noteController;
