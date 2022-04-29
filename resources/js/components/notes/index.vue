<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let notes = ref([]);

onMounted(async () => {
    getNotes();
});

const newNote = () => {
    router.push("/note/create");
};

const getNotes = async () => {
    const response = await axios.get("/api/notes");
    notes.value = response.data.notes;
    console.log("notes", notes.value);
};

const onEdit = (id) => {
    router.push(`/note/edit/${id}`);
};

const deleteNote = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    })
        .then(async (result) => {
            if (result.value) {
                await axios.delete(`/api/notes/${id}`);
                getNotes();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        })
        .catch(() => {
            Swal.fire("Failed!", "There was something wrong", "error");
        });
};
</script>

<template>
    <!-- <div class="card-header"> -->
    <div class="row">
        <div class="col">
            <h4>App de notas</h4>
        </div>
        <div class="col-auto">
            <button class="btn btn-primary" @click="newNote">Add Note</button>
        </div>
    </div>
    <hr />
    <div
        class="card border border-primary mb-3"
        v-for="note in notes"
        :key="note.id"
    >
        <div class="card-header bg-primary text-white">{{ note.title }}</div>
        <div class="card-body text-primary">{{ note.description }}</div>
        <div class="card-footer">
            <div class="row">
                <div class="col-auto">
                    <button
                        class="btn btn-primary btn-sm"
                        @click="onEdit(note.id)"
                    >
                        Edit
                    </button>
                </div>
                <div class="col-auto">
                    <button
                        class="btn btn-danger btn-sm"
                        @click="deleteNote(note.id)"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!notes.length" class="alert alert-info">No notes found</div>
</template>
