<template>
  <tr class="border-b border-gray-200 hover:bg-gray-100">
    <td class="px-6 py-1">{{ game.id }}</td>
    <td class="px-6 py-1 text-left">{{ game.display_name }}</td>
    <td class="px-6 py-1 font-bold">3</td> <!-- amount of players -->
    <td class="px-6 py-1"><PrimaryButton class="{{ username ? '' : 'disabled' }}" @click="join" :content="'Join'"></PrimaryButton></td>
  </tr>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  name: "GameListEntry",
  props: ["game", "username"],
  components: {PrimaryButton},
  methods: {
    join() {
      this.$emit('join', this.game);
    },
  },
};
</script>
