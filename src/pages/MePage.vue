<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <h6 class="text-weight-bold">
        Olá {{ user.email }}
        <br>
        Meus alunos no sistema:
      </h6>
      <section
        v-if="user.user_metadata.admin"
      >
        <div
          v-for="usuario in usuariosDoSistema" :key="usuario.id">
          <div>
            {{ usuario.nome }} - {{ usuario.email }}
          </div>
          <img :src="usuario.avatar_user" style="width: 140px; height: 140px" >
          <button>Editar Aluno</button>
        </div>
      </section>
    </div>
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
