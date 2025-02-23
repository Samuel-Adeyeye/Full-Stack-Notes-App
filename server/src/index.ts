import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/notesRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});

export default app;