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
      <notes-list :createdNote="createdNote" />
    </div>
  </div>
</template>


<script setup lang="ts">
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { useToast } from "vue-toastification";
import { Note, TimezoneInfo } from "../types";
import { constants, errorMessages } from "../utils/constants";
import { formatDateTime } from "../utils";
import { setNotesToLocalStorage } from "../services";
import { getSelectedDateTime, submitNotesInfo } from "../api";

const toast = useToast();
const isLoading: Ref<boolean> = ref(false);
const createdNote: Ref<Note | null> = ref(null);
const handleAddCreatedNote = async (note: Note) => {
  try {
    isLoading.value = true;
    const { dateTimeData } = await getSelectedDateTime(
      constants.GET_TIMEZONES_API,
      note.area,
      note.location
    );
    note.time = formatDateTime(toRaw(dateTimeData.value as any).utcDatetime);
    note.id = Date.now();

    await submitNotesInfo(constants.SUBMIT_DATA_API, {
      body: note.description,
      time: note.time,
    });
    toast.success("Note added successfully!");
    setNotesToLocalStorage(constants.LOCAL_SAVED_NOTES, note);
    createdNote.value = note;
  } catch (error) {
    toast.error("Oops! something went wrong. Please try again");
  } finally {
    isLoading.value = false;
  }
};
</script>

