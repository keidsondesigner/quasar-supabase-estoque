<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header class="q-mb-lg">
      <q-toolbar>
        <q-toolbar-title>
          Quasar Estoque
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
