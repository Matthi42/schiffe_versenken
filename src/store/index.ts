import { ClientMessage } from '@/types/clientCom'
import { ChatMessageI, Player } from '@/types/playerList'
import { ServerMessage } from '@/types/serverCom'
import { Ship, Point } from '@/types/ship'

import { createStore } from 'vuex'

import main from '../main'

// State class

class State {
  ships: Ship[]
  myID: number | null = null
  lastMessage: string
  otherPlayers: Player[] = []
  myName = ''
  nameValid = false
  globalChat: ChatMessageI[] = []

  constructor() {
    this.ships = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5,].map((n, i) => {
      return {
        shipPos: { x: 12, y: 2 * n - 2 },
        shipID: i,
        shipSize: n,
        orientation: "horizontal",
      }
    })
    this.lastMessage = ''
  }
}

// helper function

const arrayOfLength = (l: number) => [...Array(l).keys()]
const cords = (ship: Ship): Point[] => arrayOfLength(ship.shipSize)
  .map(n => ship.orientation == 'horizontal'
    ? { x: ship.shipPos.x + n, y: ship.shipPos.y }
    : { x: ship.shipPos.x, y: ship.shipPos.y + n }
  )
const occupies = (ship: Ship): Point[] => {
  const cor = cords(ship)
  const co = new Set(cor.map(c => JSON.stringify(c)))
  cor.forEach((c => {
    co.add(JSON.stringify({ x: c.x + 1, y: c.y }))
    co.add(JSON.stringify({ x: c.x + 1, y: c.y + 1 }))
    co.add(JSON.stringify({ x: c.x - 1, y: c.y }))
    co.add(JSON.stringify({ x: c.x - 1, y: c.y - 1 }))
    co.add(JSON.stringify({ x: c.x, y: c.y + 1 }))
    co.add(JSON.stringify({ x: c.x - 1, y: c.y + 1 }))
    co.add(JSON.stringify({ x: c.x, y: c.y - 1 }))
    co.add(JSON.stringify({ x: c.x + 1, y: c.y - 1 }))
  }
  ))
  return Array.from(co).map(s => JSON.parse(s))
}
const noIntersect = (ship1: Ship, ship2: Ship): boolean =>
  occupies(ship1).every(c => cords(ship2).every(c2 => c.x != c2.x || c.y != c2.y))

// sends message to WS-Server
const sendObject = (obj: ClientMessage) => main.$socket.send(JSON.stringify(obj))

// store 
export default createStore({
  state: new State(),
  getters: {
    lastMessage(state) {
      return state.lastMessage
    },

    allShips(state) {
      return state.ships
    },
    //validates if the current state of ships is legal. every ship has to be on the grid and between each ship has to be one free tile
    validationFull(state) {
      return state.ships.every(ship =>
        state.ships.every(ship2 => ship.shipID == ship2.shipID ? true : noIntersect(ship, ship2))
      ) && state.ships.every(ship => cords(ship).every(c => c.x > 0 && c.y > 0 && c.x < 11 && c.y < 11))
    },
    validationPartial(state) {
      return state.ships.every(ship =>
        state.ships.every(ship2 => ship.shipID == ship2.shipID || ship.shipPos.x > 11 ? true : noIntersect(ship, ship2))
      ) && state.ships.every(ship => cords(ship).every(c => (c.x > 0 && c.y > 0 && c.x < 11 && c.y < 11) || c.x > 11))
    },
    otherPlayers(state) {
      return state.otherPlayers
    },
    validName(state) {
      return state.nameValid
    },
    myName(state) {
      return state.myName
    },
    globalChat(state) {
      return state.globalChat
    }
  },
  mutations: {
    moveShip(state, [x, y, shipID]: number[]) {
      const ship = state.ships.find(s => s.shipID == shipID)
      if (ship) {
        ship.shipPos = { x: x, y: y }
      }
    },
    rotateShip(state, shipID) {
      const ship = state.ships.find(s => s.shipID == shipID)
      if (ship?.orientation)
        ship.orientation = ship.orientation == 'horizontal' ? 'vertical' : 'horizontal'
    },
    setName(state, name) {
      state.nameValid = true
      state.myName = name
      sendObject({ type: 'broadcast', message: { type: 'notice', payload: { type: 'newName', name: name } } })
    },
    sendGlobalChat(state, message: string) {
      if(message != ''){
        state.globalChat.push({ ownMessage: true, sender: undefined, message: message })
        sendObject({ type: 'broadcast', message: { type: 'chat', text: message } })        
      }
    },
    SOCKET_ONOPEN(state, event) {
      console.debug(event)
    },
    SOCKET_ONMESSAGE(state, message) {
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
              state.lastMessage = data.message.text
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
                if (!state.otherPlayers.some(p => p.id == data.sender) && notice.name != '' ) {
                  state.otherPlayers.push({ name: notice.name, id: data.sender })
                }

              }
              break
            }
          }
          break
        case 'broadcast':
          if (data.sender != state.myID) {
            switch (data.message.type) {
              case 'chat':
                if ( data.message.text != '' )
                  state.globalChat.push({ ownMessage: false, sender: state.otherPlayers.find(p => p.id = data.sender)?.name, message: data.message.text })
                break
              case 'game':
                break
              // if new Player chooses name
              case 'notice': {
                const notice = data.message.payload
                if (notice.type == 'newName') {
                  if (state.myName === notice.name) {
                    sendObject({ type: 'message', message: { type: 'notice', payload: { type: 'nameTaken' } }, recipient: data.sender })
                  } else if (!state.otherPlayers.some(p => p.name == notice.name) && notice.name != '' ) {
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
          if(state.myName != ''){
            sendObject({ type: 'message', message: { type: 'notice', payload: { type: 'name', name: state.myName } }, recipient: data.clientID })
            console.debug(`send my name ${state.myName}; to ID: ${data.clientID}`)            
          }

          break
      }
    },
  },
  actions: {
  }
})
