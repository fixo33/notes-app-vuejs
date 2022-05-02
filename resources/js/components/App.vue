<script setup>
import Navbar from "./partials/Nav.vue";
</script>

<template>
    <Navbar />
    <section class="container">
        <div class="m-5">
            <router-view />
        </div>
    </section>
</template>
