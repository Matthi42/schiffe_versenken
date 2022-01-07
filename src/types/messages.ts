export type Message = ChatMessage | GameMessage | NoticeMessage | Challange

export interface GameMessage{
    type: 'game'
}

export interface ChatMessage{
    type: 'chat'
    text : string
}

export interface NoticeMessage {
    type: 'notice'
    payload : NewName | NameTaken | Name
}

export interface NewName {
    type: 'newName'
    name: string
}

export interface NameTaken {
    type: 'nameTaken'
}

export interface Name {
    type: 'name'
    name: string
}


export interface Challange {
    type: 'challange'
    message: SendCallange | CancelChallange | AccepChallange 
}

export interface SendCallange {
    type: 'sendChallange'
    firstMove: 'me' | 'you'
}
export interface CancelChallange {
    type: 'cancelChallange'
}
export interface AccepChallange {
    type: 'acceptChallange'
}