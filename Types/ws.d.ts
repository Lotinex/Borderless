declare namespace WSC {
    type Server = {
        'test-action': any;
    }
    type Client = {
        'test-action': any;
    }
}
declare namespace WSClientClass {
    type EventListener = { //required
        'message': (msg: {type: keyof WSC.Server} & WSC.Server[keyof WSC.Server]) => void;
        'ready': () => void;
    }
}