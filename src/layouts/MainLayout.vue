<!-- eslint-disable max-len -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Quasar Estoque
        </q-toolbar-title>
        <q-btn-dropdown flat color="white" icon="eva-person-outline">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>
                  Sair
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-img class="absolute-top" style="height: 150px">
        <!-- <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px"> -->
        <div class="absolute-full bg-transparent flex items-center q-gutter-md">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div>
            <div class="text-weight-bold text-dark">Olá! Bem vindo,</div>
            <div class="text-dark">@keidsonroby</div>
          </div>
        </div>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>
            Menu
          </q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import useAuthUser from 'src/composables/UseAuthUser';
import EssentialLink from 'components/EssentialLink.vue';

const $q = useQuasar();

const router = useRouter();

const { logout } = useAuthUser();

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'eva-home-outline',
    routeName: 'me',
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'eva-layers-outline',
    routeName: 'list-category',
  },
  {
    title: 'Produtos',
    caption: '',
    icon: 'eva-shopping-bag-outline',
    routeName: 'list-products',
  },
];

const leftDrawerOpen = ref(false);

function handleLogout() {
  $q.dialog({
    title: 'Sair',
    message: 'Desejar sair do sistema?',
    cancel: { color: 'negative', label: 'cancelar', flat: true },
    ok: { color: 'primary', label: 'confirmar', flat: true },
    persistent: true,
  }).onOk(async () => {
    await logout();
    router.replace({ name: 'login' });
  });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>
