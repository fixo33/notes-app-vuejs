<script setup>
import store from "../../store";

const logout = () => {
    store.dispatch("logout");
};
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Notes</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            Home
                        </router-link>
                        <!-- <a class="nav-link" href="#" @click="$router">Notes</a> -->
                    </li>
                    <li class="nav-item" v-if="store.state.auth">
                        <router-link class="nav-link" to="/note/create">
                            New
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown" v-if="store.state.auth">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ store.state.user.name }}
                        </a>
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click="logout"
                                    >Salir</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" v-if="!store.state.auth">
                        <router-link class="nav-link" to="/login">
                            Login
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!store.state.auth">
                        <router-link class="nav-link" to="/register">
                            Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
