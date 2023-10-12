<template>
  <div class="w-full flex justify-center">
    <custom-button
      data-testid="prev-button"
      :disabled="previousDisabled"
      @handleClick="handlePreviousClick"
      text="Previous"
    />
    <custom-button
      data-testid="next-button"
      :disabled="nextDisabled"
      @handleClick="handleNextClick"
      text="Next"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  previousDisabled: boolean;
  nextDisabled: boolean;
}>();
const emits = defineEmits(["previousClick", "nextClick"]);

const handlePreviousClick = () => {
  emits("previousClick");
};
const handleNextClick = () => {
  emits("nextClick");
};
</script>
