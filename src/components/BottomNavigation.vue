<template>
  <q-tabs align="center" style="color: #bea563; background-color: white">
    <q-route-tab to="/" label="" no-caps
      ><q-icon name="home" size="1.8rem" class="row" />
      <div class="text-grey text-caption">Home</div></q-route-tab
    >
    <q-route-tab to="/account" label="" no-caps>
      <q-icon name="library_books" size="1.8rem" class="row" />
      <div class="text-grey text-caption">Account</div>
    </q-route-tab>
    <q-route-tab to="/qrcode" label="" no-caps>
      <q-icon name="fullscreen" size="1.8rem" class="row" />
      <div class="text-grey text-caption">Scan</div>
    </q-route-tab>
    <q-route-tab to="/transfer" label="" no-caps>
      <q-icon name="sync_alt" size="1.8rem" class="row" />
      <div class="text-grey text-caption">Transter</div>
    </q-route-tab>
    <q-route-tab to="/" label="" no-caps>
      <q-icon name="settings  " size="1.8rem" class="row" />
      <div class="text-grey text-caption">Setting</div>
    </q-route-tab>
  </q-tabs>
</template>

<script>
import { defineComponent } from "vue";
import { QTabs, QRouteTab } from "quasar";

export default defineComponent({
  name: "BottomNavigation",
});
</script>
