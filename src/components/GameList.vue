<template>
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
    <GameListEntry @join="join(game)" v-for="game in this.games" :key="game.id" :game="game"/>
    </tbody>
  </table>
</template>

<script>

import GameListEntry from "@/components/GameListEntry";
export default {
  name: "GameList",
  components: {GameListEntry},
  props: ['games'],
  methods: {
    join(game) {
      this.$emit('join', game);
    },
  },
};
</script>
