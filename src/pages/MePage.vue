<template>
  <q-page class="flex flex-center">
    <section v-if="user && !user.user_metadata.admin">
      <p class="no-margin">
        Olá {{ user.email }}
      </p>
      <h6 class="text-weight-bold no-margin">
        Meu treino da Semana:
      </h6>
    </section>
    <section
        v-if="user && user.user_metadata.admin"
      >
        <p class="no-margin">
          Olá instrutor {{ user.email }}
        </p>
        <h6 class="text-weight-bold no-margin">
          Meus alunos no sistema:
        </h6>
        <div
          v-for="usuario in usuariosDoSistema" :key="usuario.id">
          <div>
            {{ usuario.nome }} - {{ usuario.email }}
          </div>
          <img :src="usuario.avatar_user" style="width: 140px; height: 140px">
          <button>Editar Aluno</button>
        </div>
      </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import useApiSupabase from 'src/composables/UseApiSupabase';

const { user } = useAuthUser();

const { list } = useApiSupabase();

const usuariosDoSistema = ref([]);

const table = 'usuarios';

async function handleListUsuarios() {
  try {
    usuariosDoSistema.value = await list(table);
  } catch (error) {
    alert(error.message);
  }
}

onMounted(async () => {
  handleListUsuarios();
});
</script>
