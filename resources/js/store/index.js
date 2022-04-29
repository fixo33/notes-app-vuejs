import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
    state: {
        user: null,
        auth: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.auth = Boolean(user);
        },
    },
    actions: {
        async logout({ dispatch }) {
            await axios.post("/api/logout");
            await dispatch("getUser");
        },
        async login({ dispatch }, credentials) {
            await axios
                .post("/api/login", credentials)
                .then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Logged in!",
                    });
                })
                .catch((err) => {
                    toast.fire({
                        icon: "error",
                        title: "Invalid credentials!",
                    });
                });

            await dispatch("getUser");
        },
        async getUser({ commit }) {
            await axios
                .get("/api/user")
                .then((response) => {
                    // console.log("SET_USER", response.data);
                    commit("SET_USER", response.data);
                })
                .catch((error) => {
                    console.log(error);
                    commit("SET_USER", null);
                });
        },
    },
});

export default store;
