export type ServerMessage = init | message | broadcast | error | disconnect
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

export interface error {
    type: 'error'
    message: string
}

export interface disconnect {
    type: 'disconnect'
    user: number
}

export interface gameMessage {
    test: number
}

export interface Ship {
    shipPos: Point,
    shipID: number,
    shipSize: number,
    orientation: "horizontal" | "vertical",
}

export interface Point {
    x: number
    y: number
}