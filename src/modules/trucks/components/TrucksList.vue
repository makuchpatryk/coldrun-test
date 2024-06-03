<template>
  <DataTable
    :value="result"
    tableStyle="min-width: 50rem"
    showGridlines
    editMode="cell"
    paginator
    :rows="params.limit"
    dataKey="id"
    v-model:filters="filters"
    filterDisplay="row"
    :globalFilterFields="['id', 'code', 'name', 'status', 'description']"
    removableSort
    lazy
    :totalRecords="totalRecords"
    :loading="isLoading"
    @page="onPage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    :pt="{
      table: { style: 'min-width: 10rem, max-width: 20rem' },
      column: {
        bodycell: ({ state }) => ({
          style:
            state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem',
        }),
      },
    }"
  >
    <template #header>
      <div style="text-align: left">
        <Button icon="pi pi-plus" label="Crete new" @click="showCreateTruck" />
      </div>
    </template>
    <Column
      field="id"
      header="Id"
      sortable
      style="width: 22.5%"
      :showFilterMenu="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @keydown.enter="filterCallback()"
          class="p-column-filter"
          placeholder="Search"
        />
      </template>
    </Column>
    <Column
      field="code"
      header="Code"
      sortable
      style="width: 22.5%"
      :showFilterMenu="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @keydown.enter="filterCallback()"
          class="p-column-filter"
          placeholder="Search"
        />
      </template>
    </Column>
    <Column
      field="name"
      header="Name"
      sortable
      style="width: 22.5%"
      :showFilterMenu="false"
    >
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @keydown.enter="filterCallback()"
          class="p-column-filter"
          placeholder="Search"
        />
      </template>
    </Column>
    <Column
      field="status"
      header="Status"
      sortable
      style="width: 22.5%"
      :showFilterMenu="false"
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.status"
          :severity="getStatusLabel(slotProps.data.status)"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          v-model="filterModel.value"
          :options="statuses"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a Status"
          @change="filterCallback()"
        >
          <template #option="slotProps">
            <Tag
              :value="slotProps.option.value"
              :severity="getStatusLabel(slotProps.option.value)"
            />
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column
      field="description"
      header="Description"
      sortable
      style="width: 22.5%"
      :showFilterMenu="false"
    >
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @keydown.enter="filterCallback()"
          class="p-column-filter"
          placeholder="Search"
        />
      </template>
    </Column>
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          outlined
          rounded
          class="mr-2"
          @click="showEditTruck(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          @click="confirmDeleteTruck(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

import { onBeforeMount, toRefs } from "vue";
import { useTrucksStore } from "../store";

const {
  state,
  setState,
  getStatusLabel,
  loadData,
  onPage,
  onFilter,
  onSort,
  showCreateTruck,
  showEditTruck,
  confirmDeleteTruck,
  getStatuses,
} = useTrucksStore();
const { result, filters, totalRecords, isLoading, statuses, params } =
  toRefs(state);

onBeforeMount(async () => {
  setState("isLoading", true);

  const localFilters = {
    id: filters.value.id.value,
    code: filters.value.code.value,
    description: filters.value.description.value,
    name: filters.value.name.value,
    status: filters.value.status.value,
  };
  setState("params", {
    page: 1,
    limit: 5,
    sort: "",
    order: "",
    ...localFilters,
  });

  loadData();
});
</script>

<style scoped></style>
