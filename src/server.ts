import express, { Request, Response } from 'express';
import { HeartBeatListener } from './nats/listeners/heartbeat.listener';
import { natsWrapper } from './nats/nats-wrapper';

const PORT = process.env.PUBLIC_PORT || 4000;

// Initialize application
const app = express();

(async()=>{
    await natsWrapper.connect('test-cluster', 'nats-client-received', 'nats://localhost:4223');
    console.log('nats connected');
    natsWrapper.client.on('close', ()=>{    
        console.log('NATS connection closed');
        process.exit();
    });
    new HeartBeatListener(natsWrapper.client).listen();
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
})()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Go to your lab url - https://your-lab-url.ineuron.app:4000 to see the output