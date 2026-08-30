import toast from "react-hot-toast";

const toastStyle = {
    background: "#151618",
    color: "#F4F2ED",
    border: "1px solid rgba(199, 167, 108, 0.25)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "13px",
    fontWeight: "500",
    boxShadow: "0 20px 50px rgba(11, 11, 12, 0.25)",
};

export const successToast = (message) =>
    toast.success(message, {
        duration: 3000,
        style: toastStyle,
        iconTheme: {
            primary: "#C7A76C",
            secondary: "#0B0B0C",
        },
    });

export const errorToast = (message) =>
    toast.error(message, {
        duration: 3500,
        style: {
            ...toastStyle,
            border: "1px solid rgba(166, 75, 69, 0.35)",
        },
    });

export const loadingToast = (message) =>
    toast.loading(message, {
        style: toastStyle,
    });

export const dismissToast = (toastId) => toast.dismiss(toastId);

export const bookingSuccessToast = () =>
    successToast("Your booking has been confirmed.");

export const bookingErrorToast = () =>
    errorToast("We couldn't complete your booking.");

export const cancelSuccessToast = () =>
    successToast("Your booking has been cancelled.");

export const cancelErrorToast = () =>
    errorToast("We couldn't cancel your booking.");

export const carAddedToast = () =>
    successToast("Vehicle added to your Drivly garage.");

export const carUpdatedToast = () =>
    successToast("Vehicle details updated successfully.");

export const carDeletedToast = () =>
    successToast("Vehicle removed from your garage.");

export const loginSuccessToast = () =>
    successToast("Welcome back to Drivly.");

export const loginErrorToast = () =>
    errorToast("Unable to sign you in.");

export const registerSuccessToast = () =>
    successToast("Account created successfully.");

export const registerErrorToast = () =>
    errorToast("Unable to create your account.");

export const logoutSuccessToast = () =>
    successToast("You have been signed out.");

export const genericSuccessToast = () =>
    successToast("Action completed successfully.");

export const genericErrorToast = () =>
    errorToast("Something went wrong. Please try again.");