<template>
  <q-page padding class="container__page">
    <q-form
    class="q-form row justify-center"
    @submit.prevent="handleSubmit"
    >
      <h1 class="text-h6 text-center">
        Formulário de Categoria
      </h1>
      <div class="col-xs-10 q-gutter-y-lg">
        <q-input
          label="Nome da categoria"
          v-model="form.name"
          lazy-rules
          :rules="textRules"
        />
        <q-btn
          class="full-width text-bold q-py-xs text-subtitle1"
          :label="isUpdate ? 'Renomear' : 'Salvar'"
          color="primary"
          type="submit"
          no-caps
          unelevated
          :disable="!form.name.length || form.name.length < 4"
        />
        <q-btn
          class="full-width text-subtitle1"
          label="Cancelar"
          color="negative"
          no-caps
          flat
          :to="{ name: 'list-category' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import {
  computed, onMounted, ref, reactive,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useApiSupabase from 'src/composables/UseApiSupabase';
import useNotify from 'src/composables/UseNotify';

import { validateText } from 'src/utils/ValidateForm';

const table = 'category';

let category = reactive({});

const form = ref({
  name: '',
});

const { post, getById, update } = useApiSupabase();

const router = useRouter();

const route = useRoute();

const { notifySuccess, notifyError } = useNotify();

const textRules = validateText('Nome da categoria', 4);

// Verificando se um parâetro "id" existe na ulr da rota,
const isUpdate = computed(() => route.params.id);

async function handleSubmit() {
  try {
    if (isUpdate.value) {
      await update(table, form.value); // Atualizando categoria editada no Supabase;
      notifySuccess('Categoria editada com sucesso!');
      router.push({ name: 'list-category' });
    } else {
      notifySuccess('Categoria cadastrada com sucesso!');
      await post(table, form.value); // Salvando categoria no Supabase;
    }
    // Em caso de sucesso, ao editar ou salvar uma categoria,
    // vou redirecionar para minha lista de categorias;
    router.push({ name: 'list-category' });
  } catch (error) {
    notifyError(error.message);
  }
}

// Recuperando categoria pelo parâmetro "id" para editar;
async function handleCategoryGetById(id) {
  try {
    category = await getById(table, id);
    form.value = category; // Atualizando o input do formulário com a categoira recuperada;
  } catch (error) {
    notifyError(error.message);
  }
}

onMounted(() => {
  // Quando meu component for rendezado e montado;
  // vou chamar meu método handleCategoryGetById() se o parâmetro "id" existir na ulr da rota;

  // Se existir um parâmetro "id" na ulr da rota;
  if (isUpdate.value) {
    handleCategoryGetById(isUpdate.value); // Minha funcao vai Receber o parâmetro "id" se existir;
  }
});
</script>

<style lang="scss" scoped>
.container__page {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
