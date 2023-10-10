<script setup lang="ts">
  import constants from "~/utils/constants";
  import {
    getTimezones,
    getSelectedDateTime,
    submitTimezoneData,
  } from "../api";
  import { TimezoneInfo } from "../types";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  const { data: listOfTimezones, error: allTimezoneError } = getTimezones(
    constants.GET_TIMEZONES_API
  );
  const selectedArea: Ref<string> = ref("");
  const selectedLocation: Ref<string> = ref("");
  const savedData: Ref<{ note: string; time: string }[]> = ref([]);
  const savedNote: Ref<string> = ref("");

  const handleAreaChange = (area: string) => {
    selectedArea.value = area;
  };
  const handleLocationChange = (location: string) => {
    selectedLocation.value = location;
  };

  const handleNote = (value: string) => {
    savedNote.value = value;
  };

  onMounted(() => {
    if (!window.localStorage.getItem("responseData")) {
      window.localStorage.setItem("responseData", JSON.stringify([]));
    } else {
      const responseData = JSON.parse(
        window.localStorage.getItem("responseData") || "[]"
      );
      savedData.value = responseData;
    }
  });

  const isSubmitBtnDisabled = computed(() => {
    return !selectedArea.value || !selectedLocation.value || !savedNote.value;
  });

  const submitData = async () => {
    try {
      const { data: dateTimeData, error: locationAPIError } =
        await getSelectedDateTime(
          constants.GET_TIMEZONES_API +
            "/" +
            selectedArea.value +
            "/" +
            selectedLocation.value
        );
      const { data: savedResponse } = await submitTimezoneData(
        constants.SUBMIT_DATA_API,
        {
          body: savedNote.value,
          time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime,
        }
      );
      const responseData = JSON.parse(
        window.localStorage.getItem("responseData") || "[]"
      );
      responseData.push({
        note: savedNote.value,
        time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime,
      });
      savedData.value.push({
        note: savedNote.value,
        time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime,
      })
      window.localStorage.setItem("responseData", JSON.stringify(responseData));
       toast.success('Note added successfully!')

    } catch (error) {
      toast.error('Oops! something went wrong. Please try again')
    }
  };
</script>

<template>
  <div class="p-10 bg-gray-400 h-[100vh]">
    <div class="w-3/5 m-auto border p-4 rounded-lg border-slate-500 mb-2">
      <div class="flex w-full">
        <div class="flex items-end flex-col w-1/2">
          <custom-dropdown
            label="Area"
            :options="getAreas(toRaw(listOfTimezones))"
            @updateSelection="handleAreaChange" />
          <custom-dropdown
            label="Location"
            :options="getLocations(listOfTimezones, selectedArea)"
            @updateSelection="handleLocationChange" />
        </div>
        <div class="ml-4 w-1/2">
          <custom-textarea
            id="note"
            label="Note"
            placeholder="Enter the note..."
            @updateNote="handleNote" />
        </div>
      </div>
      <div class="flex justify-end w-full">
        <custom-button
          :disabled="isSubmitBtnDisabled"
          text="Save"
          @handleClick="submitData" />
      </div>
    </div>
    <div class="p-2">
      <custom-table :tableHeaders="['Note', 'Time']" :tableData="savedData" />
    </div>
  </div>
</template>
