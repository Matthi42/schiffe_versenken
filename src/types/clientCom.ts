import { Message } from "./messages";

export type ClientMessage = cMessage | cBroadcast

export interface cMessage {
    type: 'message'
    recipient: number
    message: Message
}

export interface cBroadcast {
    type: 'broadcast'
    message: Message
}