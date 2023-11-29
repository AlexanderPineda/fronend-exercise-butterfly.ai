import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showSwal = () => {
  withReactContent(Swal).fire({
    toast: true,
    text: "Please make sure you select scores in steps 1 and 2",
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false,
    position: "bottom-end",
    icon: "warning"
  });
};
