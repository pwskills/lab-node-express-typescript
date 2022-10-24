import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;
    async connect(clusterId: string, clientId: string, url: string) {
        return new Promise<void>((resolve, reject) => {
            this._client = nats.connect(clusterId, clientId, { url });
            this.client.on('connect', () => {
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err);
            })
        })
    }
    get client() {
        if (!this._client) {
            throw new Error('NATS client is not connected');
        }
        return this._client;
    }
}

export const natsWrapper = new NatsWrapper();