<template>
  <div class="w-full mb-2">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <textarea
      :id="id"
      rows="5"
      v-model="text"
      :class="inputClasses"
      @change="handleTextChange"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: string;
  label: string;
  placeholder: string;
}>();

const text = ref('');
const emits = defineEmits(['updateNote']);

const handleTextChange = () => {
  // Emit the selected option to the parent component
  emits('updateNote', text.value);
};


const inputClasses = computed(() => {
  return [
    'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  ];
});
</script>
