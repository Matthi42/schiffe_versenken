<template>
    <div>
        <ul>
            <li v-for="(a,i) in challenges" :key="i" @click="accept(a.challenger)">{{ a.challenger }}</li>
        </ul>
    </div>
    <button @click="toSetup">zum Spielö test</button>
</template>
<script lang="ts">
import {Vue} from 'vue-class-component'


export default class Challenges extends Vue {
    get challenges(): number[] {
        return this.$store.getters.receivedChallenges
    }
    accept(i:number) {
        console.debug(i)
        this.$store.commit('acceptChallenge',i)
    }
    toSetup(){
        this.$router.push('setup')
    }
}


</script>
