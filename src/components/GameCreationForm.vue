<template>
  <div class="w-full text-2xl text-center font-bold mt-12">Create room</div>
  <div class="w-full grid grid-cols-2 py-4">
      <InputField class="px-3" id="display_name" placeholder="Room name" v-model="room_name" />
      <InputField class="px-3" id="description" placeholder="Description" v-model="room_description" />
  </div>
  <PrimaryButton @click="createRoom" :content="'Create'"/>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputField from "@/components/InputField";

export default {
  name: "GameCreationForm",
  components: {InputField, PrimaryButton},
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
      });
    },
  },
};
</script>
