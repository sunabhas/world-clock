<script setup lang="ts">
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
  import { Note } from "../types";
  import {constants, errorMessages} from "../utils/constants";
  import {
    setNotesToLocalStorage,
    getNotesFromLocalStorage,
    setItemToLocalStorage,
    getItemFromLocalStorage,
  } from "../services";

  const listOfCreatedNotes: Ref<{ note: string; time: string }[]> = ref([]);
  const isLoading : Ref<boolean> = ref(false)

  const handleAddCreatedNote = (note: Note) => {
    setNotesToLocalStorage(constants.LOCAL_NOTE_LIST, note);
    listOfCreatedNotes.value.unshift(note);
  };
  const handleLoading = (value: boolean) => {
    isLoading.value = value
  }
  onMounted(() => {
    if (getNotesFromLocalStorage(constants.LOCAL_NOTE_LIST).length <= 0) {
      setItemToLocalStorage(constants.LOCAL_NOTE_LIST, []);
    } else {
      const allNotesFromLocalStorage = getNotesFromLocalStorage(constants.LOCAL_NOTE_LIST);
      listOfCreatedNotes.value = allNotesFromLocalStorage;
    }
  });


</script>

<template>
  <div class="p-10 h-[100vh]" :class="{'blur-[1px]' : isLoading}">
    <div class="w-4/5 m-auto mb-2">
      <moon-loader class="absolute z-10 top-2/4 left-2/4" :loading="isLoading" color="blue"/>
      <create-note @addCreatedNote="handleAddCreatedNote" @loadingStatus="handleLoading" />
      <notes-list :allNotes="listOfCreatedNotes" />
    </div>
  </div>
</template>
