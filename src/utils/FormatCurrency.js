export function formatCurrencyBr(currency) {
  const formatted = currency.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted;
}
