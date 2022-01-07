<template>
    <div>
        <ul>
            <li v-for="(a,i) in challenges" :key="i">{{ a.challenger }}</li>
        </ul>
    </div>
</template>
<script lang="ts">
import {Vue} from 'vue-class-component'


export default class Challenges extends Vue {
    get challenges() {
        return this.$store.getters.receivedChallenges
    }
}


</script>
