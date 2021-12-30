export type ServerMessage = init | message | broadcast
export interface init {
    type: 'init'
    clientID: number
    connections: Array<number>
}
export interface message {
    type: 'message'
    sender: number
    message: string
}

export interface broadcast {
    type: 'broadcast'
    sender: number
    message: string
}

export interface gameMessage {
    test:number
}