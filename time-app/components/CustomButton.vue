<template>
  <button
    type="button"
    @click="handleButtonClick"
    :disabled="disabled"
    :class="
      !disabled
        ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 text-md rounded-lg text-sm px-4 py-2 mr-2 mb-2  '
        : 'text-white bg-gray-700 font-medium rounded-lg text-sm px-5 mr-2 mb-2'
    ">
    {{ text }}
  </button>
</template>

<script setup>
  const props = defineProps(["text", "disabled"]);
  const emits = defineEmits(["handleClick"]);

  const handleButtonClick = () => {
    emits("handleClick");
  };
</script>
