<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-btn outline @click="signOutt" color="white" label="Sign Out" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { signOut } from "firebase/auth";

export default defineComponent({
  name: "MainLayout",
  methods: {
    signOutt() {
      signOut(this.$auth)
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
  setup() {
    return {};
  },
});
</script>
