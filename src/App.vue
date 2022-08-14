<template>
  <nav class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 shadow-lg navbar navbar-light">
    <div class="w-full justify-between">
      <div class="collapse navbar-collapse items-center">
        <ul class="navbar-nav flex flex-nowrap pl-0 list-style-none">
          <li class="nav-item px-6 hover:text-indigo-700 hover:underline">
            Home <span v-if="games" class="inline-block py-1 px-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded mx-2">{{ games.length }}</span>
          </li>
          <li class="nav-item px-6 hover:text-indigo-700 hover:underline">
            News
          </li>
          <li class="nav-item px-6 hover:text-indigo-700 hover:underline">
            Account
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="bg-white mx-6 my-6">
    <div v-if="!joined_game_id">
      <GameList :games="games" @join="joinGame"></GameList>
      <GameCreationForm @reload-games="loadGames"/>
    </div>
    <div v-else>
      <Game
          :id="joined_game_id"
          :display_name="'Game'"
      />
      <PrimaryButton :content="'Leave room'" @click="leaveGame"></PrimaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GameList from "@/components/GameList";
import Game from "@/components/Game";
import GameCreationForm from "@/components/GameCreationForm";

export default {
  name: 'App',
  components: {GameCreationForm, Game, GameList, PrimaryButton},
  data: function () {
    return {
      games: [],
      joined_game_id: undefined,
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
      this.joined_game_id = game.id;
    },

    leaveGame() {
      console.log("Left the game");
      console.log(this);
      this.joined_game_id = null;
    },

    loadGames() {
      fetch('http://localhost:8080/api/games').then(async (response) => {
        this.games = await response.json();
      }).catch((error) => {
        console.error('Could not fetch games! Error was: ');
        console.error(error);
      });
    }
  },

  created() {
    this.connection = new WebSocket("ws://localhost:3000");

    this.connection.onmessage = function (event) {
      console.log('We received a message! It contains: ' + event.data);
    };

    this.loadGames();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>