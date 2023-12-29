<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmitLogin">
      <p class="col-12 text-h6 text-center">Login Page</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Email" v-model="formLogin.email" />
        <q-input label="Password" v-model="formLogin.password" />
        <q-btn class="full-width" label="Login" color="primary" type="submit" />
        <q-btn
          class="full-width"
          label="Recuperar senha"
          color="primary"
          flat
          to="/forgot-password"
        />
        <q-btn
          class="full-width"
          label="Registrar"
          color="primary"
          flat
          to="/register"
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
  name: 'LoginPage',

  setup() {
    const router = useRouter();

    const { login } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const formLogin = ref({
      email: '',
      password: '',
    });

    const handleSubmitLogin = async () => {
      try {
        await login(formLogin.value);
        notifySuccess('Login efetuado com sucesso!');
        router.push({ name: 'me' });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      formLogin,
      handleSubmitLogin,
    };
  },
});
</script>
