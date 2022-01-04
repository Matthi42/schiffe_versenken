<template>
    <router-link to="/game">Game</router-link> |
    <router-link to="/setup">SetUp</router-link> 
    <div>
        <ul>
            <li v-for="player in players" v-bind:key="player.id"></li>
        </ul>
    </div>

</template>
<script lang="ts">
import {Vue} from 'vue-class-component'
import {Player} from '@/types/playerList'

export default class Lobby extends Vue {
    get players() :Player[]{
        return this.$store.getters.otherPlayers
    }
}
</script>