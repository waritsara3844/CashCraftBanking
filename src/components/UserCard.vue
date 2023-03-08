<template>
  <q-card style="background: white; color: #113f61">
    <q-card-section>
      <div class="row full-height items-center q-mb-md">
        <div class="col">
          <div class="text-subtitle2" align="left">{{ name }}</div>
        </div>
        <div class="col-2">
          <div class="text-subtitle2" align="right">{{ types }}</div>
        </div>
      </div>

      <div class="text-caption">Current Balance(THB)</div>
      <div class="text-h5 text-bold">{{ balance }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserCard",
  props: {
    name: {
      Type: String,
      require: true,
    },
    types: {
      type: String,
      require: true,
    },
    balance: {
      type: String,
      require: true,
    },
  },
});
</script>
