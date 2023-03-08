<template>
  <q-page
    v-if="user"
    style="background-color: #113f61; color: white"
    class="q-pa-md"
  >
    <div class="row full-height items-center q-mb-md">
      <div class="col">
        <q-icon
          name="account_circle"
          style="color: #bea563"
          size="2.5rem"
          class="q-ml-sm q-mr-sm"
        />
      </div>
      <div class="col">
        <div class="float-right">Welcome, {{ user.fullname }}</div>
      </div>
    </div>
    <!-- ---------------------------------------------------------------- -->
    <q-card class="q-mb-md">
      <q-img
        src="https://hwc-statics.ais.th/asset_index2020/images/herobanner/2022/05/AIS_Fibre_Cybrox_Project_banner_1040x1040_th.jpg"
        style="height: 100px"
      />
    </q-card>
    <!-- ---------------------------------------------------------------- -->
    <HomeNavigation class="q-mb-md" />
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
    <div>
      <div class="text-h6 row">Promotions</div>
      <div class="row">
        <div class="col-4 q-pa-sm">
          <q-card>
            <q-img
              src="https://hwc-statics.ais.th/asset_index2020/images/herobanner/2022/05/AIS_Fibre_Cybrox_Project_banner_1040x1040_th.jpg"
          /></q-card>
        </div>
        <div class="col-4 q-pa-sm">
          <q-card>
            <q-img
              src="https://hwc-statics.ais.th/asset_index2020/images/herobanner/2022/05/AIS_Fibre_Cybrox_Project_banner_1040x1040_th.jpg"
          /></q-card>
        </div>
        <div class="col-4 q-pa-sm">
          <q-card>
            <q-img
              src="https://hwc-statics.ais.th/asset_index2020/images/herobanner/2022/05/AIS_Fibre_Cybrox_Project_banner_1040x1040_th.jpg"
          /></q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import HomeNavigation from "../components/HomeNavigation.vue";
import { useMockServer } from "stores/server";

export default defineComponent({
  name: "IndexPage",
  components: { HomeNavigation },
  created() {},
  async mounted() {
    useMockServer().getBankAccount(this.$auth, this.$db, (err, res) => {
      if (err) {
        this.$router.push("/signin");
      }
      this.user = res.user;
    });
  },
  data() {
    return {
      user: null,
    };
  },
});
</script>
