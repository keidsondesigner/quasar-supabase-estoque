<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleResetPassword"
    >
      <p class="col-12 text-h6 text-center">Digite sua nova senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Nova senha" v-model="password" />
        <q-btn
          class="full-width"
          label="Recuperar senha"
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
import { useRouter } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';

export default defineComponent({
  name: 'ResetPasswordPage',

  setup() {
    const { resetPassword } = useAuthUser();

    const router = useRouter();

    const password = ref('');

    const handleResetPassword = async () => {
      try {
        await resetPassword(password.value);
        router.push({ name: 'login' });
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      password,
      handleResetPassword,
    };
  },
});
</script>
