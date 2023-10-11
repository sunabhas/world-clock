<template>
  <div class="flex flex-col sm:flex-row w-full border p-4 border-gray-400 rounded-lg">
    <custom-textarea
      id="note"
      label="Note"
      placeholder="Enter the note..."
      @updateNote="handleNote" />
    <custom-dropdown
      label="Area"
      :options="getAreas(toRaw(listOfTimezones))"
      @updateSelection="handleAreaChange" />
    <custom-dropdown
      label="Location"
      :options="getLocations(listOfTimezones, selectedArea)"
      @updateSelection="handleLocationChange" />
    <custom-button text="Create note" @handleClick="addNote" :disabled="false" />
  </div>
</template>

<script setup lang="ts">
  import { useToast } from "vue-toastification";
  import {
    getTimezones,
    getSelectedDateTime,
    submitTimezoneData,
  } from "../api";
  import constants from "../utils/constants";
  import { formatDateTime } from "../utils";
  import { TimezoneInfo } from "../types";

  const toast = useToast();
  const selectedArea: Ref<string> = ref("");
  const selectedLocation: Ref<string> = ref("");
  const savedNote: Ref<string> = ref("");
  const emits = defineEmits(["addCreatedNote"]);

  const { data: listOfTimezones } = getTimezones(constants.GET_TIMEZONES_API);

  const handleAreaChange = (area: string) => {
    selectedArea.value = area;
  };
  const handleLocationChange = (location: string) => {
    selectedLocation.value = location;
  };

  const handleNote = (value: string) => {
    savedNote.value = value;
  };
  const validationData = computed(() => [
    { value: selectedArea.value, message: constants.AREA_ERROR_MSG },
    { value: selectedLocation.value, message: constants.LOCATION_ERROR_MSG },
    { value: savedNote.value, message: constants.NOTE_ERROR_MSG },
  ]);

  const dispatchCreateNote = (newNote: string, dateTime: string) => {
    const note = newNote;
    const time = formatDateTime(dateTime);
    const area = selectedArea.value
    const location = selectedLocation.value
    const newData = { note, time , area, location};
    emits("addCreatedNote", newData);
  };

  const handleErrorCheck = () => {
    for (const data of validationData.value) {
      if (!data.value) {
        toast.warning(data.message);
        return;
      }
    }
  };

  const addNote = async () => {
    try {
      handleErrorCheck();
      const { data: dateTimeData } = await getSelectedDateTime(
        constants.GET_TIMEZONES_API,
        selectedArea.value,
        selectedLocation.value
      );
      await submitTimezoneData(constants.SUBMIT_DATA_API, {
        body: savedNote.value,
        time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime,
      });

      dispatchCreateNote(
        savedNote.value,
        toRaw(dateTimeData.value as TimezoneInfo).utc_datetime
      );

      toast.success("Note added successfully!");
    } catch (error) {
      toast.error("Oops! something went wrong. Please try again");
    }
  };
</script>
