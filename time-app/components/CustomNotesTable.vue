<template>
  <div class="relative overflow-x-auto w-full mt-8 m-auto">
    <table class="w-full text-sm text-left text-gray-500">
      <thead
        class="text-xs text-gray-50 uppercase bg-gray-800"
      >
        <tr v-if="tableData.length">
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            scope="col"
            class="px-6 py-3 w-1/4"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>

        <tr
          v-for="(row, rowIndex) in tableData"
          :key="rowIndex"
          
          :class="
            'bg-white border-b'
          "
        >
          <td
            v-for="(header, colIndex) in tableHeaders"
            :key="colIndex"
            class="px-6 py-4 w-1/4"
          > 
            {{row[header.toLowerCase()]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  tableHeaders: string[];
  tableData: {note: string; time: string}[];
}>();
</script>
