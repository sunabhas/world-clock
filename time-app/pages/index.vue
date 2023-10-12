<script setup lang="ts">
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { useToast } from "vue-toastification";
import { Note, TimezoneInfo } from "../types";
import { constants, errorMessages } from "../utils/constants";
import { formatDateTime } from "../utils";
import {
  setNotesToLocalStorage,
  getNotesFromLocalStorage,
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services";
import { getSelectedDateTime, submitNotesInfo } from "../api";

const toast = useToast();
const itemsPerPage = constants.ITEMS_PER_PAGE;

const notesToDisplay: Ref<Note[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const currentPage = ref(1);
const totalNotes: Ref<number> = ref(-1);

const totalPages = computed(() => Math.ceil(totalNotes.value / itemsPerPage));
const listOfCreatedNotes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = currentPage.value * itemsPerPage;
  return notesToDisplay.value.slice(start, end);
});
const showPagination = computed(() => {
  return notesToDisplay.value.length > itemsPerPage;
});

const handleAddCreatedNote = async (noteInfo: Note) => {
  try {
    isLoading.value = true;
    const { data: dateTimeData } = await getSelectedDateTime(
      constants.GET_TIMEZONES_API,
      noteInfo.area,
      noteInfo.location
    );
    noteInfo.time = formatDateTime(
      toRaw(dateTimeData.value as any).utcDatetime
    );
    noteInfo.id = Date.now();

    await submitNotesInfo(constants.SUBMIT_DATA_API, {
      body: noteInfo.note,
      time: noteInfo.time,
    });

    toast.success("Note added successfully!");
    setNotesToLocalStorage(constants.LOCAL_SAVED_NOTES, noteInfo);
    notesToDisplay.value.unshift(noteInfo);
  } catch (error) {
    toast.error("Oops! something went wrong. Please try again");
  } finally {
    isLoading.value = false;
  }
};
const getPrevNotes = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const getNextNotes = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

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
</script>

<template>
  <div
    class="sm:px-32 sm:py-16 p-8 h-[100vh]"
    :class="{ 'blur-[1px]': isLoading }"
  >
    <div class="w-full m-auto mb-2">
      <moon-loader
        class="absolute z-10 top-2/4 left-2/4"
        :loading="isLoading"
        color="blue"
      />
      <create-note @addCreatedNote="handleAddCreatedNote" />
      <notes-list
        :allNotes="listOfCreatedNotes"
        :showPagination="showPagination"
        @handlePrevious="getPrevNotes"
        @handleNext="getNextNotes"
        :previousDisabled="currentPage === 1"
        :nextDisabled="currentPage === totalPages"
      />
    </div>
  </div>
</template>
