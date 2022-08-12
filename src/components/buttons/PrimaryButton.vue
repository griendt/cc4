<template>
  <Button class="bg-blue-600 text-white hover:bg-blue-700" :content="content"></Button>
</template>

<script>
import Button from "@/components/buttons/ButtonBase";
export default {
  name: "PrimaryButton",
  components: {Button},
  props: ['content'],
};
</script>
