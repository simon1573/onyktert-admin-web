<template>
    <div class="">
        <input v-model="statement.text" placeholder="Loading..." v-if="this.statement">
        <span v-else>No new statements</span>
        <div>
            <button class="content_action" id="delete" @click="deleteStatement()">Delete</button>
            <button class="content_action" id="upload" @click="uploadStatement()">Upload</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    const instance = axios.create({
        timeout: 1000
    });

    export default {
        name: 'ModContent',
        props: {
            game: Number
        },
        watch: {
            game: function (newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.loadData()
            }
        },
        data: function () {
            return {
                indexCounter: 0,
                statement: {
                    id: -1,
                    text: "",
                    type: "",
                    createdDate: ""
                }
            }
        },
        methods: {
            getGameType: function () {
                if (this.game === 0) {
                    return "NEVER_HAVE_I_EVER";
                } else if (this.game === 1) {
                    return "POINTING_GAME";
                } else if (this.game === 2) {
                    return "IN_OTHER_WORDS";
                } else if (this.game === 3) {
                    return "";
                } else if (this.game === 4) {
                    return "";
                } else {
                    console.log("this.game is out of range: " + this.game)
                }
            },

            deleteStatement: function () {
                console.log(this.statement.id);
                console.log(this.statement.text);
                this.loadData();
            },
            uploadStatement: function () {
                console.log(this.statement.id);
                console.log(this.statement.text);
                instance.post(this.$hostname + "/game/statement", {
                    "text": this.statement.text,
                    "type": this.statement.type
                })
                    .then(response => this.deleteStatement(response))
                    .catch(function (error) {
                        console.log(error);
                        alert("Failed to save statement!")
                    });
            },
            onStatementLoaded: function (response) {
                console.log(response);
                if (response.length > 0) {
                    this.statement = response[this.indexCounter];
                } else {
                    this.statement = null;
                }
            },
            loadData: function () {
                if (this.game === 0) {
                    instance
                        .get(this.$hostname + "/submitted/neverhaveiever?nsfw=true&sfw=true")
                        .then(response => this.onStatementLoaded(response.data.statements));
                } else if (this.game === 1) {
                    instance
                        .get(this.$hostname + "/submitted/pointinggame?nsfw=true&sfw=true")
                        .then(response => this.onStatementLoaded(response.data.statements));
                } else if (this.game === 2) {
                    instance
                        .get(this.$hostname + "/submitted/inotherwords?nsfw=true&sfw=true")
                        .then(response => this.onStatementLoaded(response.data.statements));
                } else if (this.game === 3) {
                    instance
                        .get(this.$hostname + "/submitted/truthordare/truth?nsfw=true&sfw=true")
                        .then(response => this.onStatementLoaded(response.data.statements));
                } else if (this.game === 4) {
                    instance
                        .get(this.$hostname + "/submitted/truthordare/dare?nsfw=true&sfw=true")
                        .then(response => this.onStatementLoaded(response.data.statements));
                } else {
                    console.log("this.game is out of range: " + this.game)
                }
            },
            mounted() {
                this.loadData();
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    input {
        font-size: 28px;
        width: 80%;
        height: 3em;
        margin: 12px;
    }

    .content_action {
        padding: 4px;
        margin: 8px;
    }

</style>
