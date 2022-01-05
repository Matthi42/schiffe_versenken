import { Message } from "./messages";

export type ServerMessage = init | message | broadcast | error | disconnect | connect
export interface init {
    type: 'init'
    clientID: number
    connections: Array<number>
}
export interface message {
    type: 'message'
    sender: number
    message: Message
}

export interface broadcast {
    type: 'broadcast'
    sender: number
    message: Message
}

export interface error {
    type: 'error'
    message: string
}

export interface disconnect {
    type: 'disconnect'
    user: number
}

export interface connect {
    type: 'connect'
    clientID: number  
}