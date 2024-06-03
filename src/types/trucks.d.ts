export enum StatusEnum {
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  LOADING = "LOADING",
  TO_JOB = "TO_JOB",
  AT_JOB = "AT_JOB",
  RETURNING = "RETURNING",
}

export interface ITruck {
  id: string;
  code: string;
  description: string;
  name: string;
  status: StatusEnum;
}

export interface ICreateEditTruck {
  code: string;
  description: string;
  name: string;
  status: StatusEnum;
}

export interface IParams {
  code?: string;
  description?: string;
  limit?: number;
  name?: string;
  order?: string;
  page?: number;
  sort?: string;
  status?: string;
}

export type TItem = {
  id: string;
  text: string;
};

export type TTrucksStore = {
  result: ITruck[];
  isLoading: boolean;
  totalRecords: number;
  params: {
    page: number;
    limit: number;
    sort?: string;
    order?: string;
  } & IParams;
  statuses: {
    label: string;
    value: StatusEnum;
  }[];
  filters: {
    id: {
      value: string;
      matchMode: FilterMatchMode.EQUALS;
    };
    code: {
      value: string;
      matchMode: FilterMatchMode.EQUALS;
    };
    description: {
      value: string;
      matchMode: FilterMatchMode.EQUALS;
    };
    name: {
      value: string;
      matchMode: FilterMatchMode.EQUALS;
    };
    status: {
      value: string;
      matchMode: FilterMatchMode.EQUALS;
    };
  };
  deleteTruckDialog: boolean;
  editTruckDialog: boolean;
  createTruckDialog: boolean;
  selectedTruck: ITruck | null;
};

export type TCreateValidation = Record<
  "code" | "name" | "description" | "status",
  string
>;
export type TEditValidation = Record<
  "code" | "name" | "description" | "status",
  string
>;

export type TTagSeverityOptions =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info"
  | "contrast";
