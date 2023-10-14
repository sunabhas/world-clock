<template>
  <div class="overflow-x-scroll relative w-full mt-8 m-auto">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-50 uppercase bg-blue-700">
        <tr v-if="tableNotesData?.length">
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
          v-for="(row, rowIndex) in tableNotesData"
          :key="rowIndex"
          :class="'bg-white border-b'"
        >
          <td
            v-for="(header, colIndex) in tableHeaders"
            :key="colIndex"
            class="px-6 py-4"
          >
            <div v-if="header.toLowerCase() === 's.no'">
              {{ (currentPage - 1) * constants.ITEMS_PER_PAGE + rowIndex + 1 }}
            </div>
            <div v-else class="truncate w-[190px]">
              {{ row[header.toLowerCase()] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { constants } from "../utils/constants";
const props = defineProps<{
  tableHeaders: string[];
  tableNotesData: { note: string; time: string }[];
  currentPage: number;
}>();
</script>
