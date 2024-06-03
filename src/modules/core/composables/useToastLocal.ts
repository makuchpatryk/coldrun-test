import { useToast } from "primevue/usetoast";

const useToastLocal = () => {
  const toast = useToast();

  const showToast = ({
    severity,
    summary,
    detail,
  }: {
    severity:
      | "success"
      | "info"
      | "warn"
      | "error"
      | "secondary"
      | "contrast"
      | undefined;
    summary: string;
    detail: string;
  }) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };
  return {
    showToast,
  };
};

export default useToastLocal;
