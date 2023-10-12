<template>
  <div class="p-2 my-4 border border-gray-400 rounded-lg">
    <custom-notes-table
      :tableHeaders="notesTableHeaders"
      :tableNotesData="allNotes"
    />

    <div class="my-4" v-show="showPagination">
      <custom-pagination
        :previousDisabled="previousDisabled"
        :nextDisabled="nextDisabled"
        @previousClick="handlePreviousClick"
        @nextClick="handleNextClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note } from "../types";
import { constants } from "../utils/constants";

const props = defineProps<{
  allNotes: Note[];
  showPagination: boolean;
  previousDisabled: boolean;
  nextDisabled: boolean;
}>();
const emits = defineEmits(["handlePrevious", "handleNext"]);

const handlePreviousClick = () => {
  emits("handlePrevious");
};
const handleNextClick = () => {
  emits("handleNext");
};
const notesTableHeaders = constants.NOTES_TABLE_HEADERS;
</script>
