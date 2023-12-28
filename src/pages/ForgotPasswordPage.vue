<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleForgotPassword"
    >
      <p class="col-12 text-h6 text-center">Digite seu email, para recuperar sua senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Email" v-model="email" />
        <q-btn
          class="full-width"
          label="Enviar"
          color="primary"
          type="submit"
        />
        <q-btn class="full-width" label="Voltar" color="primary" flat to="/" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';

export default defineComponent({
  name: 'ForgotPasswordPage',

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const email = ref('');

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        alert(`Verifique sua caixa de email ${email.value}, para resetar sua senha.`);
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
