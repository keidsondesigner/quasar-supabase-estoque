<template>
  <q-page padding class="container__page">
    <q-form
      class="q-form row justify-center"
      style="max-width: 560px;"
      @submit.prevent="handleSubmit"
    >
      <h1 class="text-h6 text-center">
        Formulário de Produto
      </h1>
      <div class="col-xs-10 q-gutter-y-lg">
        <q-input
          label="Imagem"
          stack-label=""
          v-model="imgFile"
          type="file"
          accept="image/*"
        />
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="textRules"
        />
        <q-editor
          label="Descricão"
          v-model="form.description"
          min-height="5rem"
        />
        <q-select
          v-model="form.category_id"
          :options="optionsCategories"
          label="Selecione uma categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'Categoria é obrigatório']"
        />
        <q-input
          label="Quantidade"
          v-model="form.amount"
          lazy-rules
          :rules="[val => !!val || 'Quantidade é obrigatório']"
          type="number"
        />
        <q-input
          label="Valor"
          v-model="form.price"
          lazy-rules
          :rules="[val => !!val || 'Valor é obrigatório']"
          type="number"
          prefix="R$"
        />
        <q-btn
          class="full-width text-bold q-py-xs text-subtitle1"
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
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
          :to="{ name: 'list-products' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import {
  computed, onMounted, ref,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useApiSupabase from 'src/composables/UseApiSupabase';
import useNotify from 'src/composables/UseNotify';
import { validateText } from 'src/utils/ValidateForm';

const {
  post, list, getById, update, uploadImg,
} = useApiSupabase();

const router = useRouter();

const route = useRoute();

const { notifySuccess, notifyError } = useNotify();

const table = 'product';

const optionsCategories = ref([]);

const loading = ref(true);

const form = ref({
  img_url: '',
  name: '',
  description: '',
  category_id: '',
  amount: 0,
  price: 0,
});

const imgFile = ref([]);

const textRules = validateText('Nome do produto', 4);

// Verificando se um parâmetro "id" existe na ulr da rota,
const isUpdateId = computed(() => route.params.id);

// Buscando todas as categorias na tabela "category" do Supabase;
// onde  "optionsCategories.value"  recebe o retorno dos dados;
async function handleListCategories() {
  try {
    optionsCategories.value = await list('category');
    loading.value = false;
  } catch (error) {
    notifyError(error.message);
  }
}

// Recuperando produto pelo parâmetro "id" para editar;
async function handleProductGetById(id) {
  try {
    // Atualizando o input do formulário com o produto recuperado;
    form.value = await getById(table, id);
  } catch (error) {
    notifyError(error.message);
  }
}

async function handleSubmit() {
  try {
    if (imgFile.value.length > 0) {
      const imgUrl = await uploadImg(imgFile.value[0], 'products');
      form.value.img_url = imgUrl;
    }

    if (isUpdateId.value) {
      notifySuccess('Produto editado com sucesso!');
      await update(table, form.value); // Editando e atualizando produto no Supabase;
    } else {
      notifySuccess('Produto cadastrada com sucesso!');
      await post(table, form.value); // Adicionando novo produto e Salvando produto no Supabase;
    }
    // Em caso de sucesso, ao editar ou salvar uma produto,
    // vou redirecionar para minha lista de produtos;
    router.push({ name: 'list-products' });
  } catch (error) {
    notifyError(error.message);
  }
}

onMounted(() => {
  // Quando meu component for rendezado e montado;
  // vou chamar meu método handleProductGetById() se o parâmetro "id" existir na ulr da rota;

  // Se existir um parâmetro "id" na ulr da rota;
  if (isUpdateId.value) {
    handleProductGetById(isUpdateId.value); // Minha funcao vai Receber o parâmetro "id" se existir;
  }
  handleListCategories();
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
