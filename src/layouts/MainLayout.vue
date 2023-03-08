<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer class="bg-primary text-white">
      <BottomNavigation />
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { signOut } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    BottomNavigation,
  },
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
