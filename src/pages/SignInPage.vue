<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #113f61">
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row text-h5 text-center">
          <div class="col q-mb-md" style="color: white">Sign In</div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="user.email"
              label="Email"
              outlined
              class="q-mb-sm"
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              type="password"
              v-model="user.password"
              label="Password"
              bg-color="white"
              outlined
              ><template v-slot:prepend> <q-icon name="key" /> </template
            ></q-input>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col">
            <q-btn
              @click="signIn"
              class="full-width"
              label="Sign In"
              style="background: #bea563; color: white"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  name: "SignIn",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(
        this.$auth,
        this.user.email,
        this.user.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          this.$router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    },
  },
});
</script>
