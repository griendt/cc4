<template>
  <div id="app">

    <GameListEntry v-for="game in this.games" :key="game.id" :game="game"></GameListEntry>
    <button class="inline-block px-6 py-4 bg-blue-600 text-white font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg" v-on:click="sendMessage('message', 'hello')">Send Some Real Message</button>
  </div>
</template>

<script>
import GameListEntry from "@/components/GameListEntry";
export default {
  name: 'App',
  components: {GameListEntry},
  data: function() {
    return {
      games: [],
      connection: null,
    }
  },

  methods: {
    sendMessage: function(type, payload) {
      const message = JSON.stringify({"type": type, "payload": payload});

      this.connection.send(message);
      console.log('Message sent: ' + message);
    },
  },

  created: function() {
    this.connection = new WebSocket("ws://localhost:3000");

    this.connection.onmessage = function(event) {
      console.log('We received a message! It contains: ' + event.data);
    };

    this.games = fetch('http://localhost:8080/api/games').then(async (response) => {
      this.games = await response.json();
    }).catch((error) => {
      console.error('Could not fetch games! Error was: ');
      console.error(error);
    });
  },
};
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
</style>