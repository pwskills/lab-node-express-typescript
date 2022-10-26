import express, { Request, Response } from 'express';

const PORT = process.env.PUBLIC_PORT || 4000;

// Initialize application
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Go to your lab url - https://your-lab-url.ineuron.app:4000 to see the output