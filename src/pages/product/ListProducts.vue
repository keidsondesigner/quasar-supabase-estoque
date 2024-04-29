<template>
  <q-page padding>
    <div class='row'>
      <q-table
        class='col-12'
        title='Produto'
        :rows='products'
        :columns='columnsConfig'
        :loading='loading'
        color='primary'
        row-key='id'
        flat
        bordered
        loading-label='Carregando...'
        no-data-label='Nenhum dado encontrado.'
      >
        <template v-slot:top>
          <span class='text-h6'> Produtos </span>
          <q-space />
          <q-btn
            color='primary'
            label='Adicionar'
            icon='eva-plus-circle-outline'
            outline
            :to="{ name: 'form-product' }"
          />
        </template>
        <template v-slot:body-cell-img_url='props'>
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar v-else color="grey-7" text-color="white" icon="image" />
          </q-td>
        </template>
        <template v-slot:body-cell-actions='props'>
          <q-td :props='props' class='q-gutter-x-sm'>
            <q-btn
              icon='eva-edit-2-outline'
              size='md'
              dense
              flat
              @click="handleEditProduct(props.row)"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              icon='eva-trash-2-outline'
              size='md'
              color='negative'
              dense
              flat
              @click="handleDeleteProduct(props.row)"
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
import { columnsConfig } from './tableConfig';

const table = 'product';

const products = ref([]);
const loading = ref(true);

const { list, remove } = useApiSupabase();
const { notifyError, notifySuccess } = useNotify();

const router = useRouter();

const $q = useQuasar();

async function handleListProducts() {
  try {
    products.value = await list(table);
    loading.value = false;
  } catch (error) {
    notifyError(error.message);
  }
}

// Função que passa o parâmetro "id" do item clicado, pelo url da rota;
function handleEditProduct(product) {
  router.push({ name: 'form-product', params: { id: product.id } });
}

async function handleDeleteProduct(product) {
  try {
    $q.dialog({
      title: 'Confirmar',
      message: `Desejar deletar o produto ${product.name}?`,
      cancel: { color: 'negative', label: 'cancelar', flat: true },
      ok: { color: 'primary', label: 'confirmar', flat: true },
      persistent: true,
    }).onOk(async () => {
      await remove(table, product.id); // Deletando produto no Supabase;
      notifySuccess('Produto excluída com sucesso!');
      handleListProducts(); // Recarregando a Lista de Produtos;
    });
  } catch (error) {
    notifyError(error.message);
  }
}

onMounted(() => {
  // Quando meu component for rendezado e montado
  // vou chamar meu método handleListProducts();
  handleListProducts();
});
</script>
