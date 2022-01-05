export type Message = ChatMessage | GameMessage | NoticeMessage

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


