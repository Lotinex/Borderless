import WebSocket from 'ws';
import http from 'http';

const clients: {
    [wsID: string]: WSClient;
} = {};
const server = http.createServer();
const WSS = new WebSocket.Server({
    server
});
server.listen(7010, () => {
    console.log('Server opened.')
})
class WSClient {
    private ws: WebSocket;
    constructor(ws: WebSocket){
        this.ws = ws;
    }
    public send<T extends keyof WSC.Server>(type: T, data?: WSC.Server[T]): void {
        const requestData: {type?: T} & (WSC.Server[T] | {}) = data || {};
        requestData.type = type;
        this.ws.send(JSON.stringify(requestData))
    }
    public onMessage<T extends keyof WSC.Client>(onMessageCallback: (msg: {type: T} & WSC.Client[T]) => void): void {
        this.ws.on('message', msg => {
            const msgObject = JSON.parse(msg as string);
            onMessageCallback(msgObject as any)
        })
    }
    public static generateID(): string {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + s4();
    }
    public static sendAll<T extends keyof WSC.Server>(type: T, data: WSC.Server[T]): void {
        for(const id in clients){
            clients[id].send(type, data)
        }
    }
}
WSS.on('connection', ws => {
    const Client = new WSClient(ws);
    clients[WSClient.generateID()] = Client;
})
