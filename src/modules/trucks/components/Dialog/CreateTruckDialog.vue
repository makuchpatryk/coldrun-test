<template>
  <Dialog
    v-model:visible="createTruckDialog"
    modal
    header="Create new one"
    :style="{ width: '25rem' }"
    @hide="onClose"
  >
    <span class="p-text-secondary block mb-5">Update your information.</span>
    <div class="flex flex-col align-items-center gap-3 mb-3">
      <label for="code" class="font-semibold w-6rem">Code</label>
      <InputText
        id="code"
        class="flex-auto"
        v-model="payload.code"
        :invalid="validation.code.length > 0"
        @input="validateCode"
      />
      <small id="code-validation">{{ validation.code }}</small>
    </div>
    <div class="flex flex-col align-items-center gap-3 mb-5">
      <label for="name" class="font-semibold w-6rem">Name</label>
      <InputText
        id="name"
        class="flex-auto"
        v-model="payload.name"
        :invalid="validation.name.length > 0"
        @input="validateName"
      />
      <small v-if="validation.name.length > 0" id="name-validation">{{
        validation.name
      }}</small>
    </div>
    <div class="flex flex-col align-items-center gap-3 mb-5">
      <label for="description" class="font-semibold w-6rem">Description</label>
      <InputText
        id="description"
        class="flex-auto"
        :invalid="validation.description.length > 0"
        v-model="payload.description"
      />
      <small
        v-if="validation.description.length > 0"
        id="description-validation"
        >{{ validation.description }}</small
      >
    </div>
    <div class="flex flex-col align-items-center gap-3 mb-5">
      <label for="status" class="font-semibold w-6rem">Status</label>
      <Dropdown
        id="status"
        v-model="payload.status"
        :options="statuses"
        optionLabel="label"
        optionValue="value"
        placeholder="Select a Status"
        :invalid="validation.status.length > 0"
      >
        <template #option="slotProps">
          <Tag
            :value="slotProps.option.value"
            :severity="getStatusLabel(slotProps.option.value)"
          />
        </template>
      </Dropdown>
      <small v-if="validation.status.length > 0" id="status-validation">{{
        validation.status
      }}</small>
    </div>

    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="onClose"
      ></Button>
      <Button type="button" label="Save" @click="onCreateTruck"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";

import { reactive, ref, toRefs } from "vue";
import { useTrucksStore } from "../../store";
import {
  ICreateEditTruck,
  StatusEnum,
  TCreateValidation,
} from "@/types/trucks.d";
import { isAlphanumeric } from "@/modules/core/utils";
import useToastLocal from "@/modules/core/composables/useToastLocal";

const { state, setState, getStatusLabel, createTruck } = useTrucksStore();
const { createTruckDialog, statuses } = toRefs(state);
const { showToast } = useToastLocal();

const payload = reactive<ICreateEditTruck>({
  code: "",
  name: "",
  description: "",
  status: StatusEnum.OUT_OF_SERVICE,
});
const validation = ref<TCreateValidation>({
  code: "",
  name: "",
  description: "",
  status: "",
});

const onClose = () => {
  setState("createTruckDialog", false);
};

const validateCode = () => {
  if (!isAlphanumeric(payload.code)) {
    validation.value.code = "Code must have unique alphanumeric";
  } else {
    validation.value.code = "";
  }
};
const validateName = () => {
  if (payload.name.length < 0) {
    validation.value.name = "Name have to be";
  } else {
    validation.value.name = "";
  }
};

const onCreateTruck = () => {
  if (
    Object.keys(validation.value).find(
      (i: string) => validation.value[i as keyof TCreateValidation].length > 0
    )
  ) {
    showToast({
      severity: "error",
      summary: "Failed",
      detail: "Please correct errors",
    });
    return;
  }
  createTruck(payload, (errorDetails) => {
    validation.value = { ...validation.value, ...errorDetails.value };
  });
};
</script>

<style scoped></style>
