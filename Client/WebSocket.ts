export default class WS {
    private ws: WebSocket;
    constructor(ws: WebSocket){
        this.ws = ws;
    }
    public request<T extends keyof WSC.Client>(type: T, data: WSC.Client[T]): void {
        const requestData: {type?: T} & WSC.Client[T] = data;
        requestData.type = type;
        this.ws.send(JSON.stringify(requestData))
    }
    public static connect(url: string): WS {
        return new WS(new WebSocket(url));
    }
    public on<T extends keyof WSClientClass.EventListener>(event: T, listener: WSClientClass.EventListener[T]): void {
        switch(event){
            case 'message':
                this.ws.onmessage = function(event){
                    const msgObject = JSON.parse(event.data)
                    listener(msgObject)
                }
                break;
            case 'ready':
                this.ws.onopen = <() => void>listener;
                break;
        }
    }
}