<template>
  <q-page style="background-color: #113f61; color: white">
    <div class="row q-pa-md q-mb-md">
      <div class="col text-left text-h5 text-bold">Settings</div>
    </div>
    <q-card style="color: #113f61" class="q-pa-md q-mx-md">
      <div class="row">
        <div class="col-2">
          <q-icon
            name="account_balance_wallet"
            size="2rem"
            style="color: #bea563"
          >
          </q-icon>
        </div>
        <div class="col text-h6">Account Settings</div>
      </div>
    </q-card>
    <q-card style="color: #113f61" class="q-pa-md q-ma-md">
      <div class="row">
        <div class="col-2">
          <q-icon name="security" size="2rem" style="color: #bea563"> </q-icon>
        </div>
        <div class="col text-h6">Security Settings</div>
      </div>
    </q-card>
    <q-card style="color: #113f61" class="q-pa-md q-ma-md">
      <div class="row">
        <div class="col-2">
          <q-icon name="settings" size="2rem" style="color: #bea563"> </q-icon>
        </div>
        <div class="col text-h6">General Settings</div>
      </div>
    </q-card>
    <q-card style="color: #113f61" class="q-pa-md q-ma-md">
      <div class="row">
        <div class="col-2">
          <q-icon name="home" size="2rem" style="color: #bea563"> </q-icon>
        </div>
        <div class="col text-h6">Home Settings</div>
      </div>
    </q-card>
    <div class="q-ma-md q-pa-md">
      <q-btn
        class="full-width"
        flat
        style="background-color: #bea563; color: white"
        label="logout"
        @click="this.signOut()"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { signOut } from "firebase/auth";

export default defineComponent({
  name: "SettingPage",
  methods: {
    signOut() {
      signOut(this.$auth)
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
});
</script>

<style></style>
