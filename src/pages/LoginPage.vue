<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmitLogin">
      <p class="col-12 text-h6 text-center">Login Page</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input
          label="Email"
          v-model="formLogin.email"
          type="email"
          lazy-rules
          :rules="emailRules"
          />
        <q-input
          label="Password"
          v-model="formLogin.password"
          type="password"
          lazy-rules
          :rules="passwordRules"
          />
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
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { validateEmail } from 'src/utils/ValidateForm';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

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

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' });
      }
    });

    return {
      formLogin,
      handleSubmitLogin,

      emailRules: [
        (val) => val.length || 'email obrigatório',
        (val) => validateEmail(val) || 'email inválido',
      ],
      passwordRules: [
        (val) => val.length || 'senha obrigatória',
        (val) => val.length >= 6 || 'senha deve conter 6 ou mais caracters',
      ],
    };
  },
});
</script>
