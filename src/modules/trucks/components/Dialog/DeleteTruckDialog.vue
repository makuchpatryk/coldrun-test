<template>
  <Dialog
    v-model:visible="deleteTruckDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
    @hide="onClose"
  >
    <div class="flex">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="selectedTruck"
        >Are you sure you want to delete <b>{{ selectedTruck.code }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="onClose"
      ></Button>
      <Button type="button" label="Save" @click="() => deleteTruck"></Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { toRefs } from "vue";
import { useTrucksStore } from "../../store";

const { state, setState, deleteTruck } = useTrucksStore();
const { deleteTruckDialog, selectedTruck } = toRefs(state);

const onClose = () => {
  setState("deleteTruckDialog", false);
  setState("selectedTruck", null);
};
</script>

<style scoped></style>
