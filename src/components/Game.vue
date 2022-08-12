<template>
  <div class="w-full font-bold text-xl">{{ this.display_name }}</div>
  <div class="grid grid-cols-9 my-6">
    <div class="mx-2 my-2 border-4 align-middle"
         :class="markup(i)"
         style="aspect-ratio: 1/1"
         :key="i"
         v-for="i in 81">{{ i }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
  props: ['id', 'display_name', 'state'],
  methods: {
    markup(i) {
      if ([32,40,42,50].includes(i)) {
        return 'border-solid bg-gray-200 hover:bg-white hover:border-gray-500';
      }
      if (i === 41) {
        return 'border-solid border-black bg-black text-white';
      }
      return 'border-dotted';
    },
  },
};
</script>
