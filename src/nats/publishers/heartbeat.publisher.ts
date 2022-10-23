import { Publisher } from "../base/publisher";
import { Subjects } from "../base/subjects";
import { HeartBeatSentEvent } from "../event-types/heartbeat.event";

export class HeartBeatPublisher extends Publisher<HeartBeatSentEvent> {
    subject: Subjects.HeartBeatSent = Subjects.HeartBeatSent;
}