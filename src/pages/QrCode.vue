<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #113f61; color: white"
    ><q-page-container>
      <q-page class="q-pa-md">
        <!-- ------------------------------ -->
        <div class="row items-center q-mb-xl q-mt-md">
          <div class="col-8 text-right text-h6 text-white">
            Scan QR / Barcode
          </div>
          <q-btn
            icon="close"
            class="text-white col-4"
            align="right"
            flat
            @click="this.$router.go(-1)"
          />
          <hr class="col-12" />
        </div>

        <!-- ------------------------------ -->
        <QrcodeStream @decode="onDecode" @init="onInit" />
        <!--  -->
        <div align="center" class="q-mt-md">
          <q-btn
            class="full-width q-mt-md"
            flat
            style="background-color: #bea563; color: white"
            no-caps
            @click="this.myqr()"
            >My QR Code</q-btn
          >
        </div>
      </q-page></q-page-container
    >
    <q-footer class="q-pa-md" style="background-color: #113f61">
      <q-btn
        class="full-width q-mt-md"
        flat
        style="background-color: #bea563; color: white"
        no-caps
        @click="this.$router.go(-1)"
      >
        Back</q-btn
      >
    </q-footer></q-layout
  >
</template>

<script>
import { defineComponent } from "vue";
import { useMockServer } from "stores/server";
import { QrcodeStream } from "vue-qrcode-reader/src/index";
export default defineComponent({
  name: "QrCode",
  components: { QrcodeStream },
  async mounted() {},
  data() {
    return { result: "", error: "" };
  },
  methods: {
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    onDecode(result) {
      this.result = result;
      this.$router.push({
        path: "/transfer",
        query: {
          data: result,
        },
      });
    },
    myqr() {
      this.$router.push("/myqrcode");
    },
  },
});
</script>
