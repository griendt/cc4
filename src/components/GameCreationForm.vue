<template>
  <div class="w-full text-2xl text-center font-bold mt-12">Create room</div>
  <div class="w-full grid grid-cols-2 py-4">
    <div class="px-3">
      <input
          class="shadow border rounded w-full px-3 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="display_name"
          type="text"
          placeholder="Room name"
          v-model="room_name"
      >
    </div>
    <div class="px-3">
      <input
          class="shadow border rounded w-full px-3 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="display_name"
          type="text"
          placeholder="Description"
          v-model="room_description"
      >
    </div>
  </div>
  <PrimaryButton @click="createRoom" :content="'Create'"/>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  name: "GameCreationForm",
  components: {PrimaryButton},
  emits: ['reload-games'],
  data: () => {
    return {
      room_name: '',
      room_description: '',
    };
  },
  methods: {
    createRoom() {
      fetch('http://localhost:8080/api/games', {
        method: 'POST',
        body: JSON.stringify({display_name: this.room_name}),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.$emit('reload-games');
      }); // todo: add .then, update game list etc.
    },
  },
};
</script>
