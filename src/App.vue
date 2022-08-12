<template>
  <div class="bg-white mx-6 my-6">
    <table v-if="!this.joined_game" class="table-auto w-full shadow-md">
      <thead>
      <tr class="bg-gray-200 text-gray-600 leading-normal text-center">
        <th class="py-3 px-6 text-left text-center">ID</th>
        <th class="py-3 px-6 text-left text-center">Name</th>
        <th class="py-3 px-6 text-left text-center">#Players</th>
        <th class="py-3 px-6 text-left text-center">Actions</th>
      </tr>
      </thead>
      <tbody class="text-gray-600 font-light">
      <GameListEntry @join="joinGame" v-for="game in this.games" :key="game.id" :game="game"/>
      </tbody>
    </table>
    <PrimaryButton v-else :content="'Leave room'" @click="leaveGame"></PrimaryButton>
  </div>
</template>

<script>
import GameListEntry from "@/components/GameListEntry";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  name: 'App',
  components: {GameListEntry, PrimaryButton},
  data: function () {
    return {
      games: [],
      joined_game: null,
      connection: null,
    }
  },

  methods: {
    sendMessage(type, payload) {
      const message = JSON.stringify({"type": type, "payload": payload});
      this.connection.send(message);
      console.log('Message sent: ' + message);
    },

    joinGame(game) {
      console.log("The game has been joined!");
      this.joined_game = game;
    },

    leaveGame() {
      console.log("Left the game");
      console.log(this);
      this.joined_game = null;
    },
  },

  created() {
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