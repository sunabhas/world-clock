<template>
  <div
    :class="{ 'border border-gray-400 rounded-lg': listOfCreatedNotes.length }"
    class="p-2 my-4"
  >
    <custom-notes-table
      :tableHeaders="notesTableHeaders"
      :tableNotesData="listOfCreatedNotes"
      :currentPage="currentPage"
    />

    <div class="my-4" v-show="showPagination">
      <custom-pagination
        :previousDisabled="currentPage === 1"
        :nextDisabled="currentPage === totalPages"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @previousClick="getPrevNotes"
        @nextClick="getNextNotes"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note } from "../types";
import { constants } from "../utils/constants";
import {
  setNotesToLocalStorage,
  getNotesFromLocalStorage,
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services";

const props = defineProps<{
  createdNote: Note;
  nextDisabled: boolean;
}>();

const currentPage = ref(1);
const notesToDisplay: Ref<Note[]> = ref([]);
const totalNotes: Ref<number> = ref(-1);
const itemsPerPage = constants.ITEMS_PER_PAGE;
const notesTableHeaders = constants.NOTES_TABLE_HEADERS;

const showPagination = computed(() => {
  return notesToDisplay.value.length > itemsPerPage;
});
const totalPages = computed(() => {
  return Math.ceil(notesToDisplay.value.length / itemsPerPage);
});
const listOfCreatedNotes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = currentPage.value * itemsPerPage;
  const createdNote = toRaw(props.createdNote);
  if (
    createdNote &&
    !notesToDisplay.value.some((note) => note.id === createdNote.id)
  ) {
    notesToDisplay.value.unshift(createdNote);
  }
  return notesToDisplay.value.slice(start, end);
});

onMounted(() => {
  if (getNotesFromLocalStorage(constants.LOCAL_SAVED_NOTES).length <= 0) {
    setItemToLocalStorage(constants.LOCAL_SAVED_NOTES, []);
  } else {
    currentPage.value = 1;
    const allNotesFromLocalStorage = getNotesFromLocalStorage(
      constants.LOCAL_SAVED_NOTES
    );
    notesToDisplay.value = allNotesFromLocalStorage;
    totalNotes.value = getNotesFromLocalStorage(
      constants.LOCAL_SAVED_NOTES
    ).length;
  }
});

const getPrevNotes = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const getNextNotes = () => {
  if (currentPage.value < toRaw(totalPages.value)) {
    currentPage.value++;
  }
};
</script>
