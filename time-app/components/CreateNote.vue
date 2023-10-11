<template>
  <div
    class="flex flex-col sm:flex-row w-full justify-center items-center border p-4 border-gray-400 rounded-lg">
    <div class="w-full sm:w-[30%] p-2">
      <custom-textarea
        id="note"
        label="Note"
        placeholder="Enter the note..."
        @updateNote="handleNote" />
    </div>
    <div class="w-full sm:w-[30%] p-2">
      <custom-dropdown
        label="Area"
        :options="getAreas(rawValue)"
        @updateSelection="handleAreaChange" />
    </div>
    <div class="w-full sm:w-[30%] p-2">
      <custom-dropdown
        label="Location"
        :options="getLocations(listOfTimezones, selectedArea)"
        @updateSelection="handleLocationChange" />
    </div>
    <div class="w-full flex justify-center item-baseline mt-8 sm:w-[20%] p-2">
      <custom-button
        text="Create note"
        @handleClick="addNote"
        :disabled="false" />
    </div>
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
  import { formatDateTime, getAreas, getLocations } from "../utils";
  import { TimezoneInfo } from "../types";

  const toast = useToast();
  const selectedArea: Ref<string> = ref("");
  const selectedLocation: Ref<string> = ref("");
  const savedNote: Ref<string> = ref("");
  const modifiedListOfTimeZone: Ref<string[]> = ref([]);
  const emits = defineEmits(["addCreatedNote"]);

  const { data: listOfTimezones } = getTimezones(constants.GET_TIMEZONES_API);
  const rawValue = toRaw(listOfTimezones);

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
    const area = selectedArea.value;
    const location = selectedLocation.value;
    const newData = { note, time, area, location };
    emits("addCreatedNote", newData);
  };

  const addNote = async () => {
    try {
      for (const data of validationData.value) {
        if (!data.value) {
          toast.warning(data.message);
          return;
        }
      }
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
