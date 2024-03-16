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
          />
        </template>
        <template v-slot:body-cell-actions='props'>
          <q-td :props='props' class='q-gutter-x-sm'>
            <q-btn icon='eva-edit-2-outline' size='md' dense flat>
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              icon='eva-trash-2-outline'
              size='md'
              color='negative'
              dense
              flat
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
import UseApiSupabase from 'src/composables/UseApiSupabase';
import useNotify from 'src/composables/UseNotify';

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

const categories = ref([]);
const loading = ref(true);

const { list } = UseApiSupabase();
const { notifyError } = useNotify();

async function handleListCategories() {
  try {
    categories.value = await list('category');
    loading.value = false;
  } catch (error) {
    notifyError(error.message);
  }
}

onMounted(() => {
  // Quando meu component for rendezado e montado
  // vou chamar meu método handleListCategories();
  console.log('batata aqui');
  handleListCategories();
});
</script>
