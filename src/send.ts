import { natsWrapper } from "./nats/nats-wrapper";
import { HeartBeatPublisher } from "./nats/publishers/heartbeat.publisher";

const num = process.argv[2];

(async()=>{
    await natsWrapper.connect('test-cluster', 'nats-client-sender', 'nats://localhost:4223');
    console.log('nats connected');
    natsWrapper.client.on('close', ()=>{    
        console.log('NATS connection closed');
        process.exit();
    });
    [...Array(parseInt(num))].forEach(async (item, index) => {
        await new HeartBeatPublisher(natsWrapper.client).publish({
            workerServerPrivateIP: '1',
            cpuCount: `${index+1}`,
            freeMemory: '1',
            totalMemory:'1',
            hostName: '1',
            noOfRunningContainers: '1',
            status: '1',
            version: '1'
        })
    })
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
})();