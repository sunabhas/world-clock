<template>
  <div
    class="flex flex-col sm:flex-row w-full justify-center items-center border p-4 border-gray-400 rounded-lg"
  >
    <div class="w-full sm:w-[40%] p-2">
      <custom-text-field
        id="note"
        label="Note"
        placeholder="Enter the note..."
        v-model="createNoteFormValues.note"
        @updateText="handleNote"
      />
    </div>
    <div class="w-full sm:w-[25%] p-2">
      <custom-dropdown
        id="area"
        label="Area"
        :options="getAreas(listOfTimezones)"
        v-model="createNoteFormValues.area"
        @updateSelection="handleAreaChange"
      />
    </div>
    <div class="w-full sm:w-[25%] p-2">
      <custom-dropdown
        id="location"
        label="Location"
        v-model="createNoteFormValues.location"
        :options="getLocations(listOfTimezones, createNoteFormValues.area)"
        @updateSelection="handleLocationChange"
      />
    </div>
    <div class="w-full flex justify-center item-baseline mt-8 sm:w-[20%] p-2">
      <custom-button text="Add Note" @handleClick="addNote" :disabled="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { getTimezones } from "../api";
import { constants, errorMessages } from "../utils/constants";
import { getAreas, getLocations } from "../utils";

const toast = useToast();
const createNoteFormValues: Ref<{
  note: string;
  area: string;
  location: string;
}> = ref({
  note: "",
  area: "",
  location: "",
});
const createdNote: Ref<string> = ref("");
const modifiedListOfTimeZone: Ref<string[]> = ref([]);
const emits = defineEmits(["addCreatedNote", "loadingStatus"]);
const props = defineProps<{
  isNoteSavedSuccessfully: boolean;
}>();

const { listOfTimezones, timeZoneApiError } = getTimezones(
  constants.GET_TIMEZONES_API
);
if (timeZoneApiError.value) {
  toast.error(
    "Oops! Something went wrong in fetching areas and locations. Please try again"
  );
}
const validationData = computed(() => [
  {
    value: createNoteFormValues.value.note,
    message: errorMessages.NOTE_ERROR_MSG,
  },
  {
    value: createNoteFormValues.value.area,
    message: errorMessages.AREA_ERROR_MSG,
  },
  {
    value: createNoteFormValues.value.location,
    message: errorMessages.LOCATION_ERROR_MSG,
  },
]);

const handleAreaChange = (area: string) => {
  createNoteFormValues.value.area = area;
};
const handleLocationChange = (location: string) => {
  createNoteFormValues.value.location = location;
};
const handleNote = (value: string) => {
  createNoteFormValues.value.note = value;
};

const dispatchCreatedNote = (newNote: string) => {
  const noteInfo = { ...createNoteFormValues.value };
  emits("addCreatedNote", noteInfo);
};
const addNote = async () => {
  for (const data of validationData.value) {
    if (!data.value) {
      toast.warning(data.message);
      return;
    }
  }
  dispatchCreatedNote(createdNote.value);
};

watch(
  () => props.isNoteSavedSuccessfully,
  () => {
    createNoteFormValues.value.area = "";
    createNoteFormValues.value.note = "";
    createNoteFormValues.value.location = "";
  }
);
</script>


