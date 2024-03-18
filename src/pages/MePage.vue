<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>
        Olá {{ user.email }}
        <br>
        {{ user.user_metadata.name }}
      </p>
    </div>
  </q-page>
</template>

<script setup>
import useAuthUser from 'src/composables/UseAuthUser';

const { user } = useAuthUser();
</script>
