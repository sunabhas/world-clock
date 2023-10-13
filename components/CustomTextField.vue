<template>
  <div class="w-full">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }} <span class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :value="modelValue"
      @input="handleTextChange"
      :placeholder="placeholder"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  id: string;
  label: string;
  placeholder: string;
  modelValue: string;
}>();

const text = ref("");
const emits = defineEmits(["updateText"]);

const handleTextChange = (event: Event) => {
  emits("updateText", (event.target as HTMLInputElement).value);
};
</script>
