<script setup lang="ts">
  import { Note } from "../types";
  import constants from "../utils/constants";
  import {
    setNotesToLocalStorage,
    getNotesFromLocalStorage,
    setItemToLocalStorage,
    getItemFromLocalStorage,
  } from "../services";

  const listOfCreatedNotes: Ref<{ note: string; time: string }[]> = ref([]);

  const handleAddCreatedNote = (note: Note) => {
    setNotesToLocalStorage(constants.LOCAL_NOTE_LIST, note);
    listOfCreatedNotes.value.unshift(note);
  };

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
  <div class="p-10 h-[100vh]">
    <div class="w-4/5 m-auto mb-2">
      <create-note @addCreatedNote="handleAddCreatedNote" />
      <notes-list :allNotes="listOfCreatedNotes" />
    </div>
  </div>
</template>
