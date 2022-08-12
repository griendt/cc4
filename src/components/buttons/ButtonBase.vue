<template>
  <button
      class="inline-block px-6 py-4 font-medium rounded shadow-md hover:shadow-lg">{{ content }}
  </button>

</template>

<script>
export default {
  name: "ButtonBase",
  props: ['content'],
};
</script>
