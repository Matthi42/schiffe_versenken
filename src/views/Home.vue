<template>
  <div class="home">
    <input type="text" v-model="message">
    <button title="send"  @click="send()">send</button>
    <p>{{ lastMessage }}</p>
    <Field :setUp="true"></Field>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import Field from '@/components/Field.vue'
import { ServerMessage } from '@/types/serverCom'

@Options({
  components: {
    HelloWorld,
    Field,
  },
})
export default class Home extends Vue {
  message = ''
  lastMessage = ''
  connection: WebSocket | null = null
  myID: number | null = null

  send()  {
    this.connection?.send(JSON.stringify({
      type: 'broadcast',
      message: this.message
    }))
  }


  created():void {
    console.log('starting connection')
    this.connection = new WebSocket('ws://localhost:3000')
    this.connection.onmessage = m => {
      const data:ServerMessage = JSON.parse(m.data)
      switch (data.type){
        case 'init': {
          this.myID = data.clientID
          break
        }
        case 'broadcast': {
          if(data.sender != this.myID)
            this.lastMessage = data.message
          break
        }
        case 'message': {
          this.lastMessage = data.message
          break
        }
      }
    }
  }
}
</script>
