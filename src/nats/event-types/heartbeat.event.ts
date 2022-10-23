import { Subjects } from './../base/subjects';
export interface HeartBeatSentEvent {
    subject: Subjects.HeartBeatSent,
    data: {
        workerServerPrivateIP: string,
        hostName:string,
        totalMemory: string,
        freeMemory: string,
        cpuCount: string,
        noOfRunningContainers: string,
        status: string
        version: string
    }
}