<template>
  <div>
    <TrucksList />
    <EditTruckDialog />
    <CreateTruckDialog />
    <DeleteTruckDialog />
  </div>
</template>

<script setup lang="ts">
import TrucksList from "trucks/components/TrucksList.vue";
import CreateTruckDialog from "../components/Dialog/CreateTruckDialog.vue";
import EditTruckDialog from "../components/Dialog/EditTruckDialog.vue";
import DeleteTruckDialog from "../components/Dialog/DeleteTruckDialog.vue";
</script>
