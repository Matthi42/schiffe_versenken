import { Point, ServerMessage, Ship } from '@/types/serverCom'
import { createStore } from 'vuex'

class State {
  ships: Ship[]
  myID: number | null = null
  lastMessage: string
  otherPlayers = []

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
    SOCKET_ONOPEN(state, event) {
      console.debug(event)
    },
    SOCKET_ONMESSAGE(state, message) {
      console.debug(message)
      const data: ServerMessage = JSON.parse(message.data)
      console.debug(data)
      switch (data.type) {
        case 'init':
          state.myID = data.clientID
          break
        case 'error':
          console.error(`WS Server error: ${data.message}`)
          break
        case 'message':
          state.lastMessage = data.message
          break
        case 'broadcast':
          if (data.sender != state.myID)
            state.lastMessage = data.message
          break
        case 'disconnect':
          state.otherPlayers = state.otherPlayers.filter((p: { id: number, name: string }) => p.id != data.user)
          break

      }
    },
  },
  actions: {
  }
})
