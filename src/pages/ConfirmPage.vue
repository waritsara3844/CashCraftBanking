<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #113f61; color: white"
    ><q-page-container>
      <q-page class="q-pa-md">
        <!-- ------------------------------ -->
        <div class="row items-center q-mb-xl">
          <q-btn
            icon="arrow_back"
            class="text-white col-4"
            align="left"
            flat
            @click="this.$router.go(-1)"
          />
          <div class="col-8 text-left text-h6 text-white">Confirm Details</div>
        </div>
        <!-- ------------------------------ -->
        <q-card class="text-black q-pa-md">
          <div class="row">
            <div class="col-2 text-bold">From</div>
            <div class="col-10 text-bold text-right">{{ this.names.from }}</div>
            <div class="col-12 text-caption text-right">
              {{ this.confirmdata.from }}
            </div>
          </div>
          <hr class="q-mb-md q-mt-md" />
          <div class="row">
            <div class="col-2 text-bold">To</div>
            <div class="col-10 text-bold text-right">{{ this.names.to }}</div>
            <div class="col-12 text-caption text-right">
              {{ this.confirmdata.to }}
            </div>
          </div>
          <hr class="q-mb-md q-mt-md" />
          <div class="row">
            <div class="col-2 text-bold">Amount</div>
            <div class="col-10 text-right q-mb-md">
              {{ this.confirmdata.amount }}
            </div>
          </div>
          <hr class="q-mb-md q-mt-md" />
          <div class="row q-mb-md">
            <div class="col-2 text-bold">Fee</div>
            <div class="col-10 text-right">0</div>
          </div>
        </q-card>
        <div>
          <q-btn
            class="full-width q-mt-md"
            flat
            style="background-color: #bea563; color: white"
            no-caps
            @click="this.transter()"
            >Confirm Transfer</q-btn
          >
        </div>
      </q-page></q-page-container
    ></q-layout
  >
</template>

<script>
import { defineComponent } from "vue";
import { useMockServer } from "stores/server";

export default defineComponent({
  name: "ConfirmPage",

  async mounted() {
    this.confirmdata = JSON.parse(this.$route.query.data);
    useMockServer().getNameByNumber(
      this.$auth,
      this.$db,
      this.confirmdata.from,
      (err, res) => {
        if (err) {
          this.$router.push("/signin");
        }
        this.names.from = res.fullname;
      }
    );
    useMockServer().getNameByNumber(
      this.$auth,
      this.$db,
      this.confirmdata.to,
      (err, res) => {
        if (err) {
          this.$router.push("/signin");
        }
        this.names.to = res.fullname;
      }
    );
  },
  data() {
    return {
      confirmdata: {
        from: null,
        to: null,
        amount: null,
      },
      names: {
        from: "",
        to: "",
      },
    };
  },
  methods: {
    transter() {
      let d = new Date();
      this.confirmdata.date = `${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()}`;
      useMockServer().transferMoney(
        this.$auth,
        this.$db,
        this.confirmdata,
        (err, res) => {
          if (err) {
            this.$router.push("/signin");
          }
          if (res) {
            this.$router.push({
              path: "/slip",
              query: {
                data: JSON.stringify(this.confirmdata),
              },
            });
          }
        }
      );
    },
  },
});
</script>
