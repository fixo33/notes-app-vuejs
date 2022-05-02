<script setup>
import axiosClient from "../../axios";

const getInformations = () => {
    axiosClient
        .post("/privateInformations")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};
</script>

<template>
    <h1>Dashboard</h1>
    <button @click="getInformations">Get for information</button>
</template>
