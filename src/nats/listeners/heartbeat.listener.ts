import { Message } from 'node-nats-streaming';
import { Listener } from '../base/listener';
import { Subjects } from '../base/subjects';
import { HeartBeatSentEvent } from '../event-types/heartbeat.event';

const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const waitForSeconds = (seconds: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

export class HeartBeatListener extends Listener<HeartBeatSentEvent> {
    subject: Subjects.HeartBeatSent = Subjects.HeartBeatSent;
    queueGroupName = 'HeartBeatService';
    async onMessage(data: HeartBeatSentEvent['data'], msg: Message) {
        try {
            console.log(`HeartBeatListener Received Data: ${data.cpuCount}`);
            await waitForSeconds(randomInRange(1, 5));
            console.log(`HeartBeatListener Acknowledged:  ${data.cpuCount}`);

            throw new Error('f')
            // msg.ack();
        } catch (error) {
            console.error(error);
        }
    }
}
