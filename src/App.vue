<template>
  <div id="app">
    <div class="bg-white shadow-md rounded my-6">
      <table class="table-auto w-full">
        <thead>
        <tr class="bg-gray-200 text-gray-600 leading-normal">
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">#Players</th>
          <th class="py-3 px-6 text-left">Actions</th>
        </tr>
        </thead>
        <tbody class="text-gray-600 font-light">
        <GameListEntry v-for="game in this.games" :key="game.id" :game="game"/>
        </tbody>
      </table>
      <!--    <PrimaryButton :content="'Send!'" v-on:click="sendMessage('message', 'hello')"></PrimaryButton>-->
    </div>
  </div>
</template>

<script>
import GameListEntry from "@/components/GameListEntry";
// import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  name: 'App',
  components: {GameListEntry},
  data: function () {
    return {
      games: [],
      connection: null,
    }
  },

  methods: {
    sendMessage: function (type, payload) {
      const message = JSON.stringify({"type": type, "payload": payload});

      this.connection.send(message);
      console.log('Message sent: ' + message);
    },
  },

  created: function () {
    this.connection = new WebSocket("ws://localhost:3000");

    this.connection.onmessage = function (event) {
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