<template>
  <q-page padding>
    <div class='row'>
      <q-table
        class='col-12'
        title='Categoria'
        :rows='categories'
        :columns='columns'
        :loading='loading'
        color='primary'
        row-key='id'
        flat
        bordered
        loading-label='Carregando...'
        no-data-label='Nenhum dado encontrado.'
      >
        <template v-slot:top>
          <span class='text-h6'> Categoria </span>
          <q-space />
          <q-btn
            color='primary'
            label='Adicionar'
            icon='eva-plus-circle-outline'
            outline
            :to="{ name: 'form-category' }"
          />
        </template>
        <template v-slot:body-cell-actions='props'>
          <q-td :props='props' class='q-gutter-x-sm'>
            <q-btn
              icon='eva-edit-2-outline'
              size='md'
              dense
              flat
              @click="handleEditCategory(props.row)"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              icon='eva-trash-2-outline'
              size='md'
              color='negative'
              dense
              flat
              @click="handleDeleteCategory(props.row)"
            >
              <q-tooltip> Excluír </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useApiSupabase from 'src/composables/UseApiSupabase';
import useNotify from 'src/composables/UseNotify';

import { useQuasar } from 'quasar';

const columns = [
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'Nome',
    sortable: true,
  },
  {
    name: 'actions',
    field: 'actions',
    align: 'right',
    label: 'Ações',
    sortable: true,
  },
];

const table = 'category';

const categories = ref([]);
const loading = ref(true);

const { list, remove } = useApiSupabase();
const { notifyError, notifySuccess } = useNotify();

const router = useRouter();

const $q = useQuasar();

async function handleListCategories() {
  try {
    categories.value = await list(table);
    loading.value = false;
  } catch (error) {
    notifyError(error.message);
  }
}

async function handleDeleteCategory(category) {
  try {
    $q.dialog({
      title: 'Confirmar',
      message: `Desejar deletar a categoria ${category.name}?`,
      cancel: { color: 'negative', label: 'cancelar', flat: true },
      ok: { color: 'primary', label: 'confirmar', flat: true },
      persistent: true,
    }).onOk(async () => {
      await remove(table, category.id); // Deletando categoria no Supabase;
      notifySuccess('Categoria excluída com sucesso!');
      handleListCategories(); // Recarregando a Lista de Categorias;
    });
  } catch (error) {
    notifyError(error.message);
  }
}

// Função que passa o parâmetro "id" do item clicado, pelo url da rota;
function handleEditCategory(category) {
  router.push({ name: 'form-category', params: { id: category.id } });
}

onMounted(() => {
  // Quando meu component for rendezado e montado
  // vou chamar meu método handleListCategories();
  console.log('batata aqui');
  handleListCategories();
});
</script>
