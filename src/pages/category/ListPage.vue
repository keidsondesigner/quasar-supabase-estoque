<template>
  <q-page padding>
    <div class="row">
      <q-table
        class="col-12"
        title="Categoria"
        :rows="rows"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >
        <template v-slot:top>
          <span class="text-h6">
            Categoria
          </span>
          <q-space />
          <q-btn color="primary" label="Adicionar" outline/>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="eva-edit-2-outline" size="md" dense flat>
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn icon="eva-trash-2-outline" size="md" color="negative" dense flat>
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [

  {
    name: 'name', field: 'name', align: 'left', label: 'Nome', sortable: true,
  },
  {
    name: 'actions', field: 'actions', align: 'right', label: 'Ações', sortable: true,
  },
];

const rows = [
  {
    id: '123',
    name: 'Ténis',
  },
];

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryListPage',
  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>

<style lang="scss" scoped></style>
