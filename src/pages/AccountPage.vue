<template>
  <q-page style="background-color: #113f61" class="q-pa-md text-white">
    <div class="row items-center q-mb-md">
      <div class="col"><div class="text-h6">Deposit</div></div>
      <div class="col">
        <q-icon
          name="menu"
          style="color: white"
          size="1.5rem"
          class="float-right"
        />
      </div>
    </div>
    <!-- -------------------------------- -->
    <UserCard v-bind="this.displaydata" class="q-mb-md" />
    <!-- ------------------------------------ -->
    <q-card class="q-mb-md" style="color: #bea563" flat bordered
      ><q-card-section class="row items-center" align="center"
        ><q-btn class="col-3" flat no-caps to="/transfer"
          ><q-icon name="sync_alt" size="1.8rem" class="row" />
          <div class="text-grey">Transfer</div></q-btn
        >
        <q-btn class="col-3" flat no-caps
          ><q-icon name="account_balance_wallet" size="1.8rem" class="row" />
          <div class="text-grey">Top-up</div></q-btn
        >
        <q-btn class="col-3" flat no-caps padding="sm" to="/paybill"
          ><q-icon name="request_quote" size="1.8rem" class="row" />
          <div class="text-grey">Pay Bills</div></q-btn
        >

        <q-btn class="col-3" flat no-caps
          ><q-icon name="add_circle" size="1.8rem" class="row" />
          <div class="text-grey">More</div></q-btn
        ></q-card-section
      >
    </q-card>
    <!-- ------------------------------------------------- -->
    <div>
      <div class="text-h6 row q-mb-sm">Transactions</div>
      <q-card flat bordered class="q-pa-sm" style="color: #113f61">
        <div
          class="row q-mb-sm q-ml-sm items-center"
          v-for="a in this.transactions"
        >
          <div class="col-6"><div class="text-h6">Transfer</div></div>
          <div class="col-6 text-caption text-right">{{ a.data.date }}</div>
          <div class="col-8 text-caption">
            <div v-if="a.red">To: {{ a.data.to }}</div>
            <div v-else>From: {{ a.data.from }}</div>
          </div>
          <div class="col-4 text-h6 text-right">
            <div v-if="a.red" class="text-red">- {{ a.data.amount }}</div>
            <div v-else class="text-green">+ {{ a.data.amount }}</div>
          </div>
          <div class="col-12"><q-separator color="grey" class="q-mt-sm" /></div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import UserCard from "../components/UserCard.vue";
import { useMockServer } from "stores/server";

export default defineComponent({
  name: "AccountPage",
  components: {
    UserCard,
  },
  async mounted() {
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

    useMockServer().getTransactions(this.$auth, this.$db, (err, res) => {
      if (err) {
        this.$router.push("/signin");
      }
      this.transactions = res;
    });
  },
  data() {
    return {
      userdata: null,
      account: [],
      displaydata: {},
      transactions: null,
    };
  },
});
</script>
