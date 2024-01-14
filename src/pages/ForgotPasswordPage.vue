<template>
  <q-page padding class="container__page">
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h6 text-center">Digite seu email, <br>para recuperar sua senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Email" v-model="email" type="email" lazy-rules :rules="emailRules" />
        <q-btn
          class="full-width text-bold q-py-xs text-subtitle1"
          label="Enviar"
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
import useAuthUser from 'src/composables/UseAuthUser';
import { validateEmail } from 'src/utils/ValidateForm';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'ForgotPasswordPage',

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const { notifySuccess, notifyError } = useNotify();

    const email = ref('');

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        notifySuccess(`Verifique sua caixa de email ${email.value}, para recuperar a senha.`);
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      email,
      handleForgotPassword,

      emailRules: [
        (val) => val.length || 'email obrigatório',
        (val) => validateEmail(val) || 'email inválido',
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
