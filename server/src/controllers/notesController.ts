import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface NoteController {
    getAllNotes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}


const noteController: NoteController = {
    getAllNotes: async (req, res, next) => {
        try {
            const notes = await prisma.note.findMany();
            res.json(notes);
        } catch (error) {
            next(error);
        }
    },

    createNote: async (req, res, next): Promise<void> => {
        const { title, content } = req.body;
    
        if (!title || !content) {
            res.status(400).json({ error: "Title and content are required" });
            return;
        }
    
        try {
            const note = await prisma.note.create({
                data: { title, content },
            });
            res.status(201).json(note);
            return; // Explicitly return void
        } catch (error) {
            next(error);
            return; // Ensures function matches `Promise<void>`
        }
    }
    ,

    updateNote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id, 10);

    if (!title || !content) {
        res.status(400).json({ error: "Title and content are required" });
        return; // Explicitly return to satisfy TypeScript
    }

    if (isNaN(id)) {
        res.status(400).json({ error: "ID must be a valid number" });
        return;
    }

    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content },
        });
        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
}
,

deleteNote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        res.status(400).json({ error: "ID must be a valid number" });
        return;
    }

    try {
        await prisma.note.delete({
            where: { id },
        });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error); // Pass error to middleware for proper handling
    }
},
};

export default noteController;
