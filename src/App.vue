<template>
    <div id="app">
        <img src="./assets/logo.png">
        <br>
        <select v-model="selected" name="Select game">
            <option @click="selected = 0">Jag har aldrig...</option>
            <option @click="selected = 1">Pekleken</option>
            <option @click="selected = 2">Med andra ord</option>
            <option @click="selected = 3">Sanning (Sanning eller konsekvens)</option>
            <option @click="selected = 4">Konsekvens (Sanning eller konsekvens)</option>
        </select>
        <ModContent :game="selected | getNbr"></ModContent>
    </div>
</template>

<script>
    import ModContent from './components/ModContent.vue'

    export default {
        name: 'App',
        components: {
            ModContent
        },
        filters: {
            getNbr: function(value){
                return value
            }
        },
        data: function () {
            return {
                selected: Number
            }
        },
        mounted() {
            this.selected = 0
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    img {
        width: 20%;
        height: 20%;
        border-radius: 25px;
    }
</style>
