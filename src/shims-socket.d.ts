import { ComponentCustomProperties } from 'vue'
import { WebSocket } from 'vue-native-websocket-vue3'

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {
        $socket : any
    }
}