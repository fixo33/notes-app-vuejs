<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";

const router = useRouter();
let credentials = ref({
    email: "",
    password: "",
});

const login = async () => {
    await store.dispatch("login", {
        email: credentials.value.email,
        password: credentials.value.password,
    });

    router.push("/");
};
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        v-model="credentials.email"
                    />
                </div>
                <div class="mb-3">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        v-model="credentials.password"
                    />
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
