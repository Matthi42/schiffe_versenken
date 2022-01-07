import { ClientMessage } from '@/types/clientCom'
import { ChatMessageI, Player } from '@/types/playerList'
import { Ship, Point } from '@/types/ship'

import { createStore } from 'vuex'

import main from '../main'
import { onMessage } from './onMessage'

// State class

export class State {
  // set up
  ships: Ship[]

  //communication
  myID: number | null = null
  otherPlayers: Player[] = []

  //Lobby
  myName = ''
  nameValid = false
  sentChallenges: number[] = []
  receivedChallenges: { turn: 'me' | 'you', challenger: number }[] = []

  //chat
  globalChat: ChatMessageI[] = []

  //game
  opponent: number | undefined
  myTurn = true


  constructor() {
    this.ships = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5,].map((n, i) => {
      return {
        shipPos: { x: 12, y: 2 * n - 2 },
        shipID: i,
        shipSize: n,
        orientation: "horizontal",
      }
    })
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
    },
    receivedChallenges(state) {
      return state.receivedChallenges
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
      if (message != '') {
        state.globalChat.push({ ownMessage: true, sender: undefined, message: message })
        sendObject({ type: 'broadcast', message: { type: 'chat', text: message } })
      }
    },
    challenge(state: State, [id, starter]: [number, 'me' | 'you']) {
      if (!state.sentChallenges.some(c => c == id)) {
        state.sentChallenges.push(id)
        const obj: ClientMessage = { type: 'message', recipient: id, message: { type: 'challange', message: { type: 'sendChallange', firstMove: starter } } }
        main.$socket.send(JSON.stringify(obj))
      }
    },
    acceptChallenge(state,id:number) {
      /**  eventuell 
      //alle challenges werden abgelehnt
      state.receivedChallenges.filter(c => c.challenger != id).forEach(({challenger}) =>{
        sendObject({recipient: challenger,type:'message',message:{type:'challange',message:{type:'cancelChallange'}}})
      })
      state.sentChallenges.forEach(challangee => {
        sendObject({recipient: challangee,type:'message',message:{type:'challange',message:{type:'cancelChallange'}}})
      })*/
      sendObject({recipient: id,type:'message',message:{type:'challange',message:{type:'acceptChallange'}}})
      main.$router.push('setup')
      state.opponent = id
      state.myTurn = state.receivedChallenges.find(c => c.challenger == id)?.turn == 'me' ? true : false
    },
    SOCKET_ONOPEN(state, event) {
      console.debug(event)
    },
    SOCKET_ONMESSAGE(state, message) {
      onMessage(state,message,sendObject)
    },
  },
  actions: {
  }
})
