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
          <div class="col-4 text-center text-h6 text-white">Pay Bill</div>
        </div>
        <!-- ------------------------------ -->

        <!-- ---------------------------------------------------------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row q-mb-sm">From</div>
          <UserCard v-bind="this.displaydata" />
        </div>
        <!-- ----------------- -->
        <div class="q-mb-md">
          <div class="text-h6 row q-mb-sm">To</div>
          <!-- <q-input
            v-model="this.txt_to"
            outlined
            dark
            lazy-rules
            filled
            type="number"
            label="Enter Phone Number"
          /> -->
          <div class="row" style="background-color: white; border-radius: 3px">
            <div class="col-2 q-ml-md">
              <q-avatar class="q-ma-sm">
                <img
                  src="https://www.whatphone.net/wp-content/uploads/2018/09/dtac-logo.png"
                />
              </q-avatar>
            </div>
            <div
              class="col-8 text-h6 text-bold text-left q-ma-sm"
              style="color: #113f61"
            >
              DTAC Postpaid
              <div class="col text-caption">Comp code: 3355</div>
            </div>
            <div class="col-12">
              <hr class="" />
            </div>
            <div class="row" style="color: #113f61">
              <div class="col-12 text-caption text-bold q-ma-sm">
                Moblie NO./Reference No.
              </div>
              <div class="col-12 q-mx-sm q-mb-sm">
                <q-input
                  outlined
                  v-model="ref_txt"
                  label="Enter Reference No."
                  style="width: 95%"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- ----------------- -->
        <div v-if="this.check">
          <div class="q-mb-md">
            <div class="text-h6 row q-mb-sm">Amount</div>
            <q-input
              v-model="this.txt_amount"
              outlined
              dark
              filled
              type="number"
              label="Enter Amount"
              input-class="text-right"
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
        </div>
        <q-btn
          v-else
          style="background-color: #bea563"
          class="full-width"
          no-caps
          @click="checkBill()"
          >Check Outstanding Balance
        </q-btn>
        <!-- ------------------ -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import UserCard from "../components/UserCard.vue";
import { useMockServer } from "stores/server";
export default defineComponent({
  name: "PaybillPage",
  components: {
    UserCard,
  },
  async mounted() {
    try {
      const data = JSON.parse(this.$route.query.data);
      this.txt_to = data.to;
    } catch (e) {}
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
  methods: {
    checkBill() {
      useMockServer().getAmountByRef(
        this.$auth,
        this.$db,
        this.ref_txt,
        (err, res) => {
          if (err) {
            this.$router.push("/signin");
          }
          console.log(res);
          if (res) {
            this.check = true;
            this.txt_amount = res.amount;
            this.bill_name = res.name;
          }
        }
      );
    },
    confirm() {
      if (true) {
        let data = {
          from: this.userdata.telno,
          to: this.bill_name,
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
  data() {
    return {
      userdata: null,
      account: [],
      displaydata: {},
      txt_to: "",
      txt_amount: "",
      check: false,
      ref_txt: "",
      bill_name: "",
    };
  },
});
</script>
