<template>
  <q-layout view="lHh Lpr lFf" style="color: white"
    ><q-page-container>
      <q-page>
        <q-img src="../assets/Untitled.png" @click="this.$router.push('/home')">
        </q-img
      ></q-page> </q-page-container
  ></q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoPage",
});
</script>

<style></style>
