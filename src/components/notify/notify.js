import toast from "react-hot-toast";

export const notify = (status, message) => {
  status
    ? toast.success(message, { className: "successToast" })
    : toast.error(message, { className: "failureToast" });
};
