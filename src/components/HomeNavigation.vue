<template>
  <q-card class="" style="color: #bea563" flat bordered
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
      <q-btn class="col-3" flat no-caps padding="sm"
        ><q-icon name="payments" size="1.8rem" class="row" />
        <div class="text-grey">My Cash</div></q-btn
      >
      <q-btn class="col-3" flat no-caps padding="sm"
        ><q-icon name="credit_card" size="1.8rem" class="row" />
        <div class="text-grey">C-Cards</div></q-btn
      >
      <q-btn class="col-3" flat no-caps padding="sm" to="/myqrcode"
        ><q-icon name="fullscreen" size="1.8rem" class="row" />
        <div class="text-grey">QR Code</div></q-btn
      >
      <q-btn class="col-3" flat no-caps padding="sm"
        ><q-icon name="work" size="1.8rem" class="row" />
        <div class="text-grey">Insurance</div></q-btn
      >
      <q-btn class="col-3" flat no-caps
        ><q-icon name="add_circle" size="1.8rem" class="row" />
        <div class="text-grey">More</div></q-btn
      ></q-card-section
    >
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeNavigation",
});
</script>
