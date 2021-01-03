declare namespace WSC {
    type Server = {
        'welcome': {
            msg: string;
        };
        'error-roomId-exist': {};
        'create-room-success': {};
    }
    type Client = {
        'create-room': {
            id: string;
        }
    }
}
declare namespace WSClientClass {
    type EventListener = {
        'message': (msg: {type: keyof WSC.Server} & WSC.Server[keyof WSC.Server]) => void;
        'ready': () => void;
    }
}