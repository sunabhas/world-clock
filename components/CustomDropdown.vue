<template>
  <div class="w-full px-2 select-wrapper">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }} <span class="text-red-500">*</span></label
    >
    <select
      :id="id"
      :value="modelValue"
      @change="handleSelectChange"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value="">Select {{ id }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  options: { value: string; label: string }[];
  modelValue: string;
}>();

const selectedOption = ref<string | null>(null);
const emits = defineEmits(["updateSelection"]);

const handleSelectChange = (event: Event) => {
  emits("updateSelection", (event.target as HTMLInputElement).value);
};
</script>
<style scoped>
select {
  appearance: none;
}
.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "⌄";
  font-size: 1.5rem;
  top: 22px;
  right: 15px;
  position: absolute;
  color: darkslategray;
}
</style>
