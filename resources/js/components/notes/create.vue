<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let form = ref({
    title: "",
    description: "",
});

const saveNote = () => {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("description", form.value.description);
    axios
        .post("/api/notes", formData)
        .then((response) => {
            console.log("response", response);
            form.value = {
                title: "",
                description: "",
            };
            router.push("/");
            toast.fire({
                icon: "success",
                title: "Note created successfully",
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
};
</script>
<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col">
                    <h4>App de notas</h4>
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary" @click="$router.back">
                        Back
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                    type="text"
                    class="form-control"
                    name="title"
                    v-model="form.title"
                />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                    class="form-control"
                    name="description"
                    v-model="form.description"
                />
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" @click="saveNote()">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
