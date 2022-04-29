<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let credentials = ref({
    name: "",
    email: "",
    password: "",
});

const register = async () => {
    await axios
        .post("/api/register", {
            name: credentials.value.name,
            email: credentials.value.email,
            password: credentials.value.password,
        })
        .then((res) => {
            console.log("response", res);
            toast.fire({
                icon: "success",
                title: "User created successfully",
            });
            router.push("/");
        })
        .catch((err) => {
            console.log("error", err.response.data);
            toast.fire({
                icon: "error",
                title: err.response.data.message,
            });
        });
};
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        aria-describedby="nameHelp"
                        placeholder="John Doe"
                        v-model="credentials.name"
                    />
                </div>
                <div class="mb-3">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="name@example.com"
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
                    <button type="submit" class="btn btn-primary">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
