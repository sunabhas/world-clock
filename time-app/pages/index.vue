<template>
  <div class="p-10">
    <div class="flex w-full">
      <div class="flex items-end flex-col w-1/2 ">
        <custom-dropdown
          label="Area"
          :options="listOfAreas"
          @updateSelection="handleChange"
        />
        <custom-dropdown
          label="Location"
          :options="listOfLocations"
          @updateSelection="handleChange"
        />
      </div>
      <div class="ml-4 w-1/2">
        <custom-textarea id="note" label="Note" placeholder="Enter the note..." />
      </div>
    </div>
    <div>
      <custom-table :tableHeaders="[]" :tableData="[]" />
    </div>
    <div class="flex justify-end w-[91%]">
        <custom-button text="Save" @handleClick="submitData"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { Option } from '../types'

const submitData = () => {
    //submit data
}

const listOfAreas: Ref<Option[]> = ref([]);
const listOfLocations: Ref<Option[]> = ref([]);
</script>
