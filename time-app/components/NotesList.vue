<template>
  <div class="p-2 my-4">
      <custom-notes-table :tableHeaders="notesTableHeaders" :tableNotesData="allNotes" />
    </div>
</template>

<script setup lang="ts">
import { Note } from "../types";

const props = defineProps<{
    allNotes: Note[]
}>();
const notesTableHeaders = ['Note', 'Time', 'Area', 'Location']
</script>