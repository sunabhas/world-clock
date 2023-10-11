<template>
  <div class="w-full">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{
      label
    }}</label>
    <input
      :id="id"
      v-model="text"
      @change="handleTextChange"
      :placeholder="placeholder"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: string;
    label: string;
    placeholder: string;
  }>();

  const text = ref("");
  const emits = defineEmits(["updateNote"]);

  const handleTextChange = () => {
    // Emit the selected option to the parent component
    emits("updateNote", text.value);
  };

  const inputClasses = computed(() => {
    return [
      "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    ];
  });
</script>
