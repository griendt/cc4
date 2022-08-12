<template>
  <div class="bg-white mx-6 my-6">
    <GameList v-if="!joined_game" :games="games" @join="joinGame"></GameList>
    <PrimaryButton v-else :content="'Leave room'" @click="leaveGame"></PrimaryButton>
  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GameList from "@/components/GameList";

export default {
  name: 'App',
  components: {GameList, PrimaryButton},
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