export interface Player {
    name: string
    id: number
}

export interface ChatMessageI {
    ownMessage: boolean
    sender: string | undefined
    message: string
}