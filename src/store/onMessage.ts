import { ServerMessage } from "@/types/serverCom"
import { Player } from "@/types/playerList"
import { State } from "@/store"
import { ClientMessage } from "@/types/clientCom"
import main from "@/main"


export const onMessage = (state: State, message: any, sendObject: (obj: ClientMessage) => any): void => {
    const data: ServerMessage = JSON.parse(message.data)
    console.debug(data)
    switch (data.type) {
        case 'init':
            state.myID = data.clientID
            sendObject({ type: 'broadcast', message: { type: 'chat', text: '' } })
            break
        case 'error':
            console.error(`WS Server error: ${data.message}`)
            break
        case 'message':
            switch (data.message.type) {
                case 'chat':
                    break
                case 'game':
                    break
                case 'notice': {
                    const notice = data.message.payload
                    if (notice.type == 'nameTaken') {
                        state.nameValid = false
                        state.myName = ''
                    }
                    if (notice.type == 'name') {
                        if (!state.otherPlayers.some((p: { id: number }) => p.id == data.sender) && notice.name != '') {
                            state.otherPlayers.push({ name: notice.name, id: data.sender })
                        }

                    }
                    break
                }
                case 'challange': {
                    const challange = data.message
                    switch (challange.message.type) {
                        case 'sendChallange':
                            state.receivedChallenges.push(
                                { turn: challange.message.firstMove == 'me' ? 'you' : 'me', challenger: data.sender }
                            )
                            break
                        case 'cancelChallange':
                            state.sentChallenges.filter(c => c != data.sender)
                            state.receivedChallenges.filter(c => c.challenger != data.sender) 
                            break
                        case 'acceptChallange':
                            state.opponent = data.sender
                            main.$router.push('setup')
                            break

                    }
                    break
                }
            }
            break
        case 'broadcast':
            if (data.sender != state.myID) {
                switch (data.message.type) {
                    case 'chat':
                        if (data.message.text != '')
                            state.globalChat.push(
                                { ownMessage: false, sender: state.otherPlayers.find((p: { id: number }) => p.id == data.sender)?.name, message: data.message.text }
                            )
                        break
                    case 'game':
                        break
                    // if new Player chooses name
                    case 'notice': {
                        const notice = data.message.payload
                        if (notice.type == 'newName') {
                            if (state.myName === notice.name) {
                                sendObject({ type: 'message', message: { type: 'notice', payload: { type: 'nameTaken' } }, recipient: data.sender })
                            } else if (!state.otherPlayers.some((p: Player) => p.name == notice.name) && notice.name != '') {
                                state.otherPlayers.unshift({ id: data.sender, name: notice.name })
                            }

                        }
                        break
                    }
                }
            }
            break
        case 'disconnect':
            state.otherPlayers = state.otherPlayers.filter((p: { id: number, name: string }) => p.id != data.user)
            break
        case 'connect':
            if (state.myName != '') {
                sendObject({ type: 'message', message: { type: 'notice', payload: { type: 'name', name: state.myName } }, recipient: data.clientID })
                console.debug(`send my name ${state.myName}; to ID: ${data.clientID}`)
            }

            break
    }

}

