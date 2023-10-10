
<script setup lang="ts">
import {getTimezones, getSelectedDateTime, submitTimezoneData} from '../api'
import {TimezoneInfo} from '../types'
const { data: listOfTimezones, error, pending} = getTimezones(constants.GET_TIMEZONES_API);
const selectedArea : Ref<string> = ref('')
const selectedLocation : Ref<string> = ref('')
const savedData : Ref<{note: string; time: string}[]> = ref([])
const savedNote: Ref<string> = ref('')

const handleAreaChange = (area: string) => {
    selectedArea.value = area
}
const handleLocationChange = (location: string) => {
    selectedLocation.value = location
}

const handleNote = (value: string) => {
  savedNote.value = value
}

onMounted(() => {
  if(!window.localStorage.getItem('responseData')) {
    window.localStorage.setItem('responseData', JSON.stringify([]))
  } else {
    const responseData = JSON.parse(window.localStorage.getItem('responseData') || '[]')
    savedData.value = responseData;
  }
   
})

const isSubmitBtnDisabled = computed(()=> {
  return !selectedArea.value || !selectedLocation.value || !savedNote.value
})

const submitData = async () => {
    const {data: dateTimeData ,  error, pending} =  await getSelectedDateTime(constants.GET_TIMEZONES_API + '/' + selectedArea.value + '/' + selectedLocation.value)
    const { data: savedResponse} = await submitTimezoneData(constants.SUBMIT_DATA_API, {body: savedNote.value, time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime })
    const responseData = JSON.parse(window.localStorage.getItem('responseData') || '[]')
    responseData.push({note: savedNote.value , time: toRaw(dateTimeData.value as TimezoneInfo).utc_datetime})
    window.localStorage.setItem('responseData', JSON.stringify(responseData))

}
</script>


<template>
  <div class="p-10">
    <div class="w-3/5 m-auto border p-4 rounded-lg border-gray-400 mb-2">
      <div class="flex w-full">
      <div class="flex items-end flex-col w-1/2">
        <custom-dropdown
          label="Area"
          :options="getAreas(toRaw(listOfTimezones))"
          @updateSelection="handleAreaChange"
        />
        <custom-dropdown
          label="Location"
          :options="getLocations(listOfTimezones, selectedArea)"
          @updateSelection="handleLocationChange"
        />
      </div>
      <div class="ml-4 w-1/2">
        <custom-textarea id="note" label="Note" placeholder="Enter the note..." @updateNote="handleNote" />
      </div>
    </div>
    <div class="flex justify-end w-full">
        <custom-button :disabled="isSubmitBtnDisabled" text="Save" @handleClick="submitData"/>
    </div>
    </div>
    <div class="p-2">
      <custom-table :tableHeaders="['Note', 'Time']" :tableData="[savedData]" />
    </div>
    
  </div>
</template>