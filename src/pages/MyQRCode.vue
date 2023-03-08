<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #113f61; color: white"
    ><q-page-container>
      <q-page class="q-pa-md">
        <!-- ------------------------------ -->
        <div class="row items-center q-mb-xl q-mt-md">
          <div class="col-8 text-right text-h6 text-white">My QR Code</div>
          <q-btn
            icon="close"
            class="text-white col-4"
            align="right"
            flat
            @click="this.$router.push('/account')"
          />
          <hr class="col-12" />
        </div>

        <!-- ------------------------------ -->
        <div class="row">
          <canvas id="qr-code" class="col-12" />
        </div>
        <q-btn
          class="full-width q-mt-md"
          flat
          style="background-color: #bea563; color: white"
          no-caps
          @click="this.$router.push('/account')"
        >
          Back</q-btn
        >
        <!--  -->
      </q-page></q-page-container
    >
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useMockServer } from "stores/server";
import QRious from "qrious";
export default defineComponent({
  name: "MyQRCode",
  async mounted() {
    useMockServer().getBankAccount(this.$auth, this.$db, (err, res) => {
      if (err) {
        this.$router.push("/signin");
      }

      new QRious({
        level: "L",
        padding: 25,
        size: 300,
        element: document.getElementById("qr-code"),
        value: `{"to": "${res.user.telno}"}`,
      });
    });
  },
  data() {
    return {
      qrLink: "",
    };
  },
  methods: {},
});
</script>
