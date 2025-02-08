// noteController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";

interface NoteController {
    getAllNotes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const prisma = new PrismaClient();

const noteController: NoteController = {
    getAllNotes: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const notes = await prisma.note.findMany();
            res.json(notes);
        }
        catch (error) {
            res.status(500).send("Error fetching notes");
        }
    },

    createNote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    updateNote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
     } catch (error) {
            res.status(500).send("Oops, something went wrong");
         }
    },

    deleteNote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = parseInt(req.params.id);

            if (!id || isNaN(id)) {
                res.status(400).send("ID field required");
            }

            try {
                await prisma.note.delete({
                where: { id },
                });
                res.status(204).send();
            } catch (error) {
                res.status(500).send("Oops, something went wrong");
            }
    },
};

export default noteController;