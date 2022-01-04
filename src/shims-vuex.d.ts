import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { Ship } from './types/serverCom'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    ships:Ship[]
    myID: number | null 
    connection: WebSocket | null
    lastMessage: string
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}