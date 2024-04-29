import { formatCurrencyBr } from 'src/utils/FormatCurrency';

const columnsConfig = [
  // name e fildes são os campos do banco de dados;
  {
    name: 'img_url',
    field: 'img_url',
    align: 'left',
    label: 'Imagem',
  },
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'Nome',
    sortable: true,
  },
  {
    name: 'amount',
    field: 'amount',
    align: 'left',
    label: 'Quantidade',
    sortable: true,
  },
  {
    name: 'price',
    field: 'price',
    align: 'left',
    label: 'Valor',
    sortable: true,
    format: (val) => formatCurrencyBr(val),
  },
  {
    name: 'actions',
    field: 'actions',
    align: 'right',
    label: 'Ações',
  },
];

export {
  columnsConfig,
};
