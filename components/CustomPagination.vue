<template>
  <div class="w-full flex justify-center">
    <custom-button
      data-testid="prev-button"
      :disabled="previousDisabled"
      @handleClick="handlePreviousClick"
      text="Previous"
    />

    <div class="text-gray-500 mt-2 mr-4 ml-1">
      {{ currentPage }} / {{ totalPages }}
    </div>
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
  currentPage: number;
  totalPages: number;
}>();
const emits = defineEmits(["previousClick", "nextClick"]);

const handlePreviousClick = () => {
  emits("previousClick");
};
const handleNextClick = () => {
  emits("nextClick");
};
</script>
