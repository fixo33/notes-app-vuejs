<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let form = ref({
    id: "",
    title: "",
    description: "",
});

onMounted(async () => {
    getSingleNote();
});

const props = defineProps({ id: { type: String, default: "" } });

const getSingleNote = async () => {
    const response = await axios.get(`/api/notes/${props.id}/edit`);
    form.value = response.data.note;
    console.log("response", response);
};

const updateNote = async () => {
    // const formData = new FormData();
    // formData.append("title", form.value.title);
    // formData.append("description", form.value.description);
    await axios.put(`/api/notes/${form.value.id}`, {
        title: form.value.title,
        description: form.value.description,
    });
    form.value = {
        id: "",
        title: "",
        description: "",
    };
    router.push("/");
    toast.fire({
        icon: "success",
        title: "Note updated successfully",
    });
    router.push("/");
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
                    <button class="btn btn-primary" @click="router.back">
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
                <button class="btn btn-primary" @click="updateNote()">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
