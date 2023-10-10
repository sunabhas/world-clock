<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            scope="col"
            class="px-6 py-3"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          :class="rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'"
        >
          <td
            v-for="(header, colIndex) in tableHeaders"
            :key="colIndex"
            class="px-6 py-4"
          >
            {{ row[header.toLowerCase()] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  tableHeaders: string[];
  tableData: Record<string, any>[];
}>();
</script>
