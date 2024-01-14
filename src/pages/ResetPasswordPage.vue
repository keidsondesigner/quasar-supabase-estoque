<template>
  <q-page padding class="container__page">
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center text-bold text-dark">Digite sua nova senha</p>
      <div class="col-xs-10 q-gutter-y-lg">
        <q-input
          label="Nova senha"
          v-model="password"
          type="password"
          lazy-rules
          :rules="passwordRules"
        />
        <q-btn
          class="full-width text-bold q-py-xs text-subtitle1"
          label="Recuperar senha"
          color="primary"
          type="submit"
          no-caps
          unelevated
        />
        <q-btn
          class="full-width text-subtitle1"
          label="Voltar"
          color="dark"
          flat
          no-caps
          to="/"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'ResetPasswordPage',

  setup() {
    const { resetPassword } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const router = useRouter();

    const password = ref('');

    const handleResetPassword = async () => {
      try {
        await resetPassword(password.value);
        notifySuccess('Senha alterada com sucesso!');
        router.push({ name: 'login' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      handleResetPassword,

      passwordRules: [
        (val) => val.length || 'senha obrigatória',
        (val) => val.length > 5 || 'senha deve conter 6 ou mais caracters',
      ],
    };
  },
});
</script>
<style lang="scss" scoped>

.container__page {
  min-height: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
