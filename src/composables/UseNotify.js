import { useQuasar } from 'quasar';

export default function useNotify() {
  const $quasar = useQuasar();

  const notifySuccess = (message) => {
    $quasar.notify({
      type: 'positive',
      message: message || 'sucesso!',
    });
  };

  const notifyError = (message) => {
    $quasar.notify({
      type: 'negative',
      message: message || 'falhou!',
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
