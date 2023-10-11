<template>
  <div class="p-2 my-4">
      <custom-notes-table :tableHeaders="['Note', 'Time', 'Area', 'Location']" :tableData="allNotes" />
    </div>
</template>

<script setup lang="ts">
import { Note } from "../types";
const props = defineProps<{
    allNotes: Note[]
}>();
</script>