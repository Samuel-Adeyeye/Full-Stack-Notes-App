import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
    },
    updateNote: async (req, res, next) => {
        const { title, content } = req.body;
        const id = parseInt(req.params.id);
        if (!title || !content) {
            res.status(400).send("title and content fields required");
        }
        if (!id || isNaN(id)) {
            res.status(400).send("ID must be a valid number");
        }
        try {
            const updatedNote = await prisma.note.update({
                where: { id },
                data: { title, content },
            });
            res.json(updatedNote);
        }
        catch (error) {
            res.status(500).send("Oops, something went wrong");
        }
    },
    deleteNote: async (req, res, next) => {
        const id = parseInt(req.params.id);
        if (!id || isNaN(id)) {
            res.status(400).send("ID field required");
        }
        try {
            await prisma.note.delete({
                where: { id },
            });
            res.status(204).send();
        }
        catch (error) {
            res.status(500).send("Oops, something went wrong");
        }
    },
};
export default noteController;
