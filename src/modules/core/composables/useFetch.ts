import { reactive, toRefs } from "vue";

interface State<T> {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  errorDetails: any;
  data: T | null;
}

export const useFetch = async <T>({
  url,
  options,
  customResponseCallback,
}: {
  url: string;
  options?: Record<string, unknown>;
  customResponseCallback?: (res: Response) => void;
}) => {
  const state = reactive<State<T>>({
    loading: true,
    error: false,
    errorMessage: "",
    errorDetails: {},
    data: null,
  });

  const fetchData = async () => {
    state.loading = true;

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        state.errorDetails = await res.json();
        throw new Error(res.statusText);
      }
      if (customResponseCallback) {
        customResponseCallback(res);
      } else {
        state.data = await res.json();
      }
    } catch (error: unknown) {
      const typedError = error as Error;
      state.error = true;
      state.errorMessage = typedError.message;
    } finally {
      state.loading = false;
    }
  };

  await fetchData();

  return {
    ...toRefs(state),
  };
};
