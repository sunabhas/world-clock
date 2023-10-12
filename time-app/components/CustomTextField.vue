<template>
  <div class="w-full">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
      <span class="text-red-500">*</span> {{ label }}
    </label>
    <input
      :id="id"
      v-model="text"
      @change="handleTextChange"
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
}>();

const text = ref("");
const emits = defineEmits(["updateText"]);

const handleTextChange = () => {
  emits("updateText", text.value);
};
</script>
