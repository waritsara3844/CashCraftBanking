<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #113f61; color: white"
    ><q-page-container>
      <q-page class="q-pa-md">
        <!-- ------------------------------ -->
        <div class="row items-center q-mb-md">
          <q-btn
            icon="arrow_back"
            class="text-white col-4"
            align="left"
            flat
            @click="this.$router.go(-1)"
          />
          <div class="col-4 text-center text-h6 text-white">Transter</div>
        </div>
        <!-- ------------------------------ -->
        <!-- ---------------------------------------------------------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row">Favorites</div>
          <div class="row items-center" align="center">
            <div class="col-3">
              <q-icon
                name="account_circle"
                size="3rem"
                style="color: #bea563"
                class="row"
              />
              <div>Alex</div>
            </div>
            <div class="col-3">
              <q-icon
                name="account_circle"
                size="3rem"
                style="color: #bea563"
                class="row"
              />
              <div>Noella</div>
            </div>
            <div class="col-3">
              <q-icon
                name="account_circle"
                size="3rem"
                style="color: #bea563"
                class="row"
              />
              <div>Hedwig</div>
            </div>
            <div class="col-3">
              <q-icon
                name="add_circle"
                size="3rem"
                style="color: #bea563"
                class="row"
              />
              <div>Add more</div>
            </div>
          </div>
        </div>
        <!-- ---------------------------------------------------------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row q-mb-sm">From</div>
          <UserCard v-bind="this.displaydata" />
        </div>
        <!-- ----------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row q-mb-sm">To</div>
          <q-input
            v-model="this.txt_to"
            outlined
            dark
            lazy-rules
            filled
            type="number"
            label="Enter Phone Number"
          />
        </div>
        <!-- ----------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row q-mb-sm">Amount</div>
          <q-input
            v-model="this.txt_amount"
            outlined
            dark
            filled
            type="number"
            label="Enter Amount"
          />
        </div>
        <!-- ------------------ -->
        <div>
          <q-btn
            class="full-width"
            flat
            style="background-color: #bea563; color: white"
            no-caps
            @click="this.confirm()"
            >Next</q-btn
          >
        </div>
        <!-- ------------------ -->
      </q-page></q-page-container
    ></q-layout
  >
</template>

<script>
import { defineComponent } from "vue";
import UserCard from "../components/UserCard.vue";
import { useMockServer } from "stores/server";
export default defineComponent({
  name: "TransferPage",
  components: {
    UserCard,
  },
  async mounted() {
    const data = JSON.parse(this.$route.query.data);
    this.txt_to = data.to;
    useMockServer().getBankAccount(this.$auth, this.$db, (err, res) => {
      if (err) {
        this.$router.push("/signin");
      }
      this.account.push(res.account);
      this.displaydata = {
        name: res.user.fullname,
        types: res.account.type,
        balance: res.account.balance.toString(),
      };
      this.userdata = res.user;
    });
  },
  data() {
    return {
      userdata: null,
      account: [],
      displaydata: {},
      txt_to: "",
      txt_amount: "",
    };
  },
  methods: {
    confirm() {
      if (this.txt_to != "" && parseFloat(this.txt_amount) > 0) {
        let data = {
          from: this.userdata.telno,
          to: this.txt_to,
          amount: this.txt_amount,
        };
        this.$router.push({
          path: "/confirm",
          query: {
            data: JSON.stringify(data),
          },
        });
      }
    },
  },
});
</script>
