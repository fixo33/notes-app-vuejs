require("./bootstrap");

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

window.Swal = Swal;
const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});
window.toast = toast;

import { createApp } from "vue";
import App from "./components/App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");
