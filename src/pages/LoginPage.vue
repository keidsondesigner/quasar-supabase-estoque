<template>
  <q-page padding class="container__page">
    <q-form class="row justify-center" @submit.prevent="handleSubmitLogin">
      <p class="col-12 text-h5 text-center text-bold text-dark">Login Page</p>
      <div class="col-xs-10 q-gutter-y-lg">
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
        <q-btn
          class="full-width text-bold q-py-xs text-subtitle1"
          label="Entrar"
          color="primary"
          type="submit"
          no-caps
          unelevated
        />
        <q-btn
          class="full-width text-subtitle1"
          label="Recuperar senha"
          color="dark"
          flat
          no-caps
          to="/forgot-password"
        />
        <q-btn
          class="full-width text-subtitle1"
          label="Criar conta"
          color="dark"
          flat
          no-caps
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
