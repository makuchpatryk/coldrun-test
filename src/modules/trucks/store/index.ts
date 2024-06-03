import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  ICreateEditTruck,
  IParams,
  ITruck,
  StatusEnum,
  TTagSeverityOptions,
  TTrucksStore,
} from "@/types/trucks.d";
import { useFetch } from "@/modules/core/composables/useFetch";
import { FilterMatchMode } from "primevue/api";
import { HintedString } from "primevue/ts-helpers";
import useToastLocal from "@/modules/core/composables/useToastLocal";

export const useTrucksStore = defineStore("trucks", () => {
  const state = reactive<TTrucksStore>({
    result: [],
    totalRecords: 0,
    isLoading: false,
    params: {
      page: 1,
      limit: 5,
    },
    statuses: [
      { label: "At job", value: StatusEnum.AT_JOB },
      { label: "Loading", value: StatusEnum.LOADING },
      { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
      { label: "Returning", value: StatusEnum.RETURNING },
      { label: "To job", value: StatusEnum.TO_JOB },
    ],
    filters: {
      id: { value: "", matchMode: FilterMatchMode.EQUALS },
      code: { value: "", matchMode: FilterMatchMode.EQUALS },
      description: { value: "", matchMode: FilterMatchMode.EQUALS },
      name: { value: "", matchMode: FilterMatchMode.EQUALS },
      status: { value: "", matchMode: FilterMatchMode.EQUALS },
    },
    deleteTruckDialog: false,
    editTruckDialog: false,
    createTruckDialog: false,
    selectedTruck: null,
  });
  const { showToast } = useToastLocal();

  const setState = <K extends keyof TTrucksStore>(
    k: K,
    value: TTrucksStore[K]
  ) => {
    state[k] = value;
  };

  const loadData = async (event?: Event & { page: number }) => {
    state.isLoading = true;
    state.params = {
      ...state.params,
      page: (event && event.page + 1) || 1,
    };
    const urlParams = new URLSearchParams();

    Object.keys(state.params).forEach((field: string) => {
      if (state.params && state.params[field as keyof IParams]) {
        urlParams.append(field, state.params[field as keyof IParams] as string);
      }
    });

    const { loading } = await useFetch<ITruck[] | null>({
      url: `${import.meta.env.VITE_API_URL}trucks?${urlParams.toString()}`,
      customResponseCallback: async (res: Response) => {
        state.totalRecords = Number(res.headers.get("x-total-count"));
        state.result = await res.json();
      },
    });

    state.isLoading = loading.value;
  };

  const onPage = (event: any) => {
    state.params.page = event.page + 1;
    state.params.limit = event.rows;
    loadData(event);
  };
  const onSort = (event: any) => {
    state.params.sort = event.sortField;
    let order = undefined;

    if (event.sortOrder === 1) {
      order = "asc";
    } else if (event.sortOrder === -1) {
      order = "desc";
    }
    state.params.order = order;

    loadData(event);
  };
  const onFilter = (event: any) => {
    state.params = {
      ...state.params,
      ...{
        id: state.filters.id.value,
        code: state.filters.code.value,
        description: state.filters.description.value,
        name: state.filters.name.value,
        status: state.filters.status.value,
      },
    };
    loadData(event);
  };

  const getStatusLabel = (
    status: StatusEnum
  ): HintedString<TTagSeverityOptions> => {
    switch (status) {
      case StatusEnum.AT_JOB:
        return "success";
      case StatusEnum.LOADING:
        return "warning";
      case StatusEnum.OUT_OF_SERVICE:
        return "danger";
      case StatusEnum.RETURNING:
        return "success";
      case StatusEnum.TO_JOB:
        return "info";

      default:
        return "secondary";
    }
  };

  const showCreateTruck = () => {
    state.createTruckDialog = true;
  };
  const showEditTruck = (item: ITruck) => {
    state.selectedTruck = item;
    state.editTruckDialog = true;
  };
  const createTruck = async (
    item: ICreateEditTruck,
    errorCallback?: (errorDetails: any) => void
  ) => {
    const { error, errorMessage, errorDetails } = await useFetch<
      ITruck[] | null
    >({
      url: `${import.meta.env.VITE_API_URL}trucks`,
      options: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
    });

    if (error.value) {
      if (errorCallback) errorCallback(errorDetails);
      showToast({
        severity: "error",
        summary: "Failed",
        detail: errorMessage.value,
      });

      return;
    }

    state.createTruckDialog = false;
    showToast({
      severity: "success",
      summary: "Successful",
      detail: "Truck is added",
    });

    loadData();
  };
  const editTruck = async (
    item: ITruck,
    errorCallback?: (errorDetails: any) => void
  ) => {
    const { error, errorMessage, errorDetails } = await useFetch<
      ITruck[] | null
    >({
      url: `${import.meta.env.VITE_API_URL}trucks/${item.id}`,
      options: {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: item.code,
          name: item.name,
          status: item.status,
          description: item.description,
        }),
      },
    });
    state.editTruckDialog = false;
    state.selectedTruck = null;

    if (error.value) {
      if (errorCallback) errorCallback(errorDetails);

      showToast({
        severity: "error",
        summary: "Failed",
        detail: errorMessage.value,
      });

      return;
    }

    showToast({
      severity: "success",
      summary: "Successful",
      detail: "Truck is updated",
    });

    loadData();
  };

  const confirmDeleteTruck = (item: ITruck) => {
    state.selectedTruck = item;
    state.deleteTruckDialog = true;
  };
  const deleteTruck = async () => {
    const { error, errorMessage } = await useFetch<ITruck[] | null>({
      url: `http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com/trucks/${state.selectedTruck.id}`,
      options: {
        method: "DELETE",
      },
    });
    state.deleteTruckDialog = false;
    state.selectedTruck = null;

    if (error.value) {
      showToast({
        severity: "error",
        summary: "Failed",
        detail: errorMessage.value,
      });

      return;
    }

    showToast({
      severity: "success",
      summary: "Successful",
      detail: "Truck is deleted",
    });

    loadData();
  };

  const getStatuses = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.AT_JOB:
        return [
          { label: "At job", value: StatusEnum.AT_JOB },
          { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
          { label: "Returning", value: StatusEnum.RETURNING },
        ];
      case StatusEnum.LOADING:
        return [
          { label: "Loading", value: StatusEnum.LOADING },
          { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
          { label: "To job", value: StatusEnum.TO_JOB },
        ];
      case StatusEnum.OUT_OF_SERVICE:
        return [
          { label: "At job", value: StatusEnum.AT_JOB },
          { label: "Loading", value: StatusEnum.LOADING },
          { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
          { label: "Returning", value: StatusEnum.RETURNING },
          { label: "To job", value: StatusEnum.TO_JOB },
        ];
      case StatusEnum.RETURNING:
        return [
          { label: "Loading", value: StatusEnum.LOADING },
          { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
          { label: "Returning", value: StatusEnum.RETURNING },
        ];
      case StatusEnum.TO_JOB:
        return [
          { label: "At job", value: StatusEnum.AT_JOB },
          { label: "Out of Service", value: StatusEnum.OUT_OF_SERVICE },
          { label: "To job", value: StatusEnum.TO_JOB },
        ];

      default:
        return [];
    }
  };

  return {
    state,
    setState,
    getStatusLabel,
    loadData,
    onPage,
    onFilter,
    onSort,
    showCreateTruck,
    showEditTruck,
    createTruck,
    editTruck,
    confirmDeleteTruck,
    deleteTruck,
    getStatuses,
  };
});
