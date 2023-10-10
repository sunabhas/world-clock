<template>
  <div class="w-1/2 my-1 mx-2">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <select
      :id="id"
      v-model="selectedOption"
      @change="handleSelectChange"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value" >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
  options: { value: string; label: string }[];
}>();

const selectedOption = ref<string | null>(null);
const emits = defineEmits(['updateSelection']);


const handleSelectChange = () => {
  // Emit the selected option to the parent component
  emits('updateSelection', selectedOption.value);
};

</script>

<style scoped>
/* You can add Tailwind CSS classes here for styling */
</style>
