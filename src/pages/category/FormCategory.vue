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
          label="Salvar"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useApiSupabase from 'src/composables/UseApiSupabase';
import useNotify from 'src/composables/UseNotify';

import { validateText } from 'src/utils/ValidateForm';

const table = 'category';

const form = ref({
  name: '',
});

const { post } = useApiSupabase();

const router = useRouter();

const { notifySuccess, notifyError } = useNotify();

const textRules = validateText('Nome da categoria', 4);

async function handleSubmit() {
  try {
    notifySuccess('Categoria cadastrada com sucesso!');
    await post(table, form.value); // Salvando categoria no Supabase;
    router.push({ name: 'list-category' });
  } catch (error) {
    notifyError(error.message);
  }
}
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
