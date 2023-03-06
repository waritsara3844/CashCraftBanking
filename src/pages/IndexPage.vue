<template>
  <q-page v-if="user">
    <div class="text-hr q-pa-md">
      <h3>Welcome {{ user.fullname }}</h3>
    </div>
    <div class="row">
      <div class="col-12 q-pa-sm" v-for="account in account" :key="account.id">
        <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ account.no }}</div>
            <div class="text-subtitle2">{{ account.data.type }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-h4 text-right">
            {{ account.data.balance }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default defineComponent({
  name: "IndexPage",
  created() {},
  async mounted() {
    onAuthStateChanged(this.$auth, async (user) => {
      if (user) {
        const uid = user.id;
        console.log(user.email);
        this.singnedInUser.email = user.email;
        const usersRef = collection(this.$db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          console.log(doc.id, "=>", doc.data().fullname);
          this.user = doc.data();
          const accountRef = collection(this.$db, "account");
          const aq = query(accountRef, where("owner", "==", doc.id));
          const aqSnapshot = await getDocs(aq);
          aqSnapshot.forEach(async (doc) => {
            console.log(doc.id, "=>", doc.data().balance);
            const account = {
              no: doc.id,
              data: doc.data,
            };
            this.account.push(account);
          });
        });
      } else {
        this.$router.push("/signin");
      }
    });
  },
  data() {
    return {
      user: null,
      singnedInUser: {
        email: null,
      },
      account: [],
    };
  },
});
</script>
