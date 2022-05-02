import { createRouter, createWebHistory } from "vue-router";

import noteIndex from "../components/notes/index.vue";
import noteCreate from "../components/notes/create.vue";
import noteEdit from "../components/notes/edit.vue";
import notFound from "../components/notFound.vue";
import Dashboard from "../components/auth/Dashboard.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

import store from "../store";

const routes = [
    {
        path: "/",
        name: "Home",
        component: noteIndex,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/note/create",
        component: noteCreate,
        meta: { requiresAuth: true },
    },
    {
        path: "/:pathMatch(.*)*",
        component: notFound,
    },
    {
        path: "/note/edit/:id",
        component: noteEdit,
        props: true,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch("getUser");
    console.log("beforeEach", from, to);
    if (to.meta.requiresAuth && !store.state.auth) {
        next({ name: "Login" });
    } else if (to.name == "Login" && store.state.auth) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
