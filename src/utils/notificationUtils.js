import { notify } from "reapop";
import Swal from "sweetalert2";
import palette from "../common/themes/palette.json";

const NOTIFICATION_PROPS = {
    // id: "NOTIFICATION",
    title: "",
    message: "",
    dismissible: false,
    dismissAfter: 2500,
    position: "top-right",
    allowHTML: true
};

export const successNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "success" });

export const infoNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "info" });

export const warningNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "warning", dismissAfter: 4000 });

export const errorNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "error", dismissAfter: 4000 });

export const loderNotify = (props) => notify({ ...NOTIFICATION_PROPS, ...props, status: "loading" });

export const confirmDialog = (payload = {}) => Swal.fire({
    title: `${"are_you_sure"} ?`, showDenyButton: true, confirmButtonText: "ok", denyButtonText: "cancel", denyButtonColor: palette.palette.error.main,
    confirmButtonColor: palette.palette.purple.main, ...payload
});
