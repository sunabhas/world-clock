<script setup lang="ts">
  import { useToast } from "vue-toastification";
  import {
    getTimezones,
    getSelectedDateTime,
    submitNotesInfo,
  } from "../api";
  import {constants, errorMessages} from "../utils/constants";
  import { formatDateTime, getAreas, getLocations } from "../utils";
  import { TimezoneInfo } from "../types";

  const toast = useToast();
  const selectedArea: Ref<string> = ref("");
  const selectedLocation: Ref<string> = ref("");
  const savedNote: Ref<string> = ref("");
  const modifiedListOfTimeZone: Ref<string[]> = ref([]);
  const isLoading : Ref<boolean> = ref(false)
  const emits = defineEmits(["addCreatedNote", "loadingStatus"]);

  const { data: listOfTimezones } = getTimezones(constants.GET_TIMEZONES_API);

   const validationData = computed(() => [
    { value: selectedArea.value, message: errorMessages.AREA_ERROR_MSG },
    { value: selectedLocation.value, message: errorMessages.LOCATION_ERROR_MSG },
    { value: savedNote.value, message: errorMessages.NOTE_ERROR_MSG },
  ]);

  const handleAreaChange = (area: string) => {
    selectedArea.value = area;
  };
  const handleLocationChange = (location: string) => {
    selectedLocation.value = location;
  };

  const handleNote = (value: string) => {
    savedNote.value = value;
  };
  const dispatchCreatedNote = (newNote: string, dateTime: string) => {
    const note = newNote;
    const time = formatDateTime(dateTime);
    const area = selectedArea.value;
    const location = selectedLocation.value;
    const noteInfo = { note, time, area, location };
    emits("addCreatedNote", noteInfo);
  };
  const addNote = async () => {
    try {  
      for (const data of validationData.value) {
        if (!data.value) {
          toast.warning(data.message);
          return;
        }
      }
      emits('loadingStatus', isLoading.value = true)
      const { data: dateTimeData } = await getSelectedDateTime(
        constants.GET_TIMEZONES_API,
        selectedArea.value,
        selectedLocation.value
      );
      await submitNotesInfo(constants.SUBMIT_DATA_API, {
        body: savedNote.value,
        time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime,
      });

      dispatchCreatedNote(
        savedNote.value,
        toRaw(dateTimeData.value as TimezoneInfo).utc_datetime
      );

      toast.success("Note added successfully!");
    } catch (error) {
      toast.error("Oops! something went wrong. Please try again");
    } finally {
        emits('loadingStatus', isLoading.value = true)
    }
  };
</script>

<template>
  <div
    class="flex flex-col sm:flex-row w-full justify-center items-center border p-4 border-gray-400 rounded-lg">
    <div class="w-full sm:w-[30%] p-2">
      <custom-textarea
        id="note"
        label="Note"
        placeholder="Enter the note..."
        @updateText="handleNote" />
    </div>
    <div class="w-full sm:w-[30%] p-2">
      <custom-dropdown
        label="Area"
        :options="getAreas(toRaw(listOfTimezones))"
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


