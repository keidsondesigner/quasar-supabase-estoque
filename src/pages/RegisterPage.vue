<template>
  <q-page padding class="container__page">
    <q-form class="row justify-center" @submit.prevent="handleSubmitRegister">
      <p class="col-12 text-h5 text-center text-bold text-dark">
        Criar uma Conta
      </p>
      <div class="col-xs-10 q-gutter-y-lg">
        <q-input
          label="Nome"
          v-model="formRegister.name"
          lazy-rules
          :rules="nameRules"
        />
        <q-input
          label="Email"
          v-model="formRegister.email"
          lazy-rules
          :rules="emailRules"
          />
        <q-input
          label="Password"
          v-model="formRegister.password"
          lazy-rules
          :rules="passwordRules"
        />
        <q-btn
          class="full-width text-subtitle1 text-bold"
          label="Register"
          color="primary"
          type="submit"
          no-caps
          unelevated
        />
        <q-btn
          class="full-width text-subtitle1"
          label="Voltar"
          color="dark"
          no-caps
          flat
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
import { validateEmail } from 'src/utils/ValidateForm';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const formRegister = ref({
      name: '',
      email: '',
      password: '',
    });

    const handleSubmitRegister = async () => {
      try {
        await register(formRegister.value);
        notifySuccess('Registro efetuado!');
        router.push({
          name: 'email-confirmation',
          query: { email: formRegister.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      formRegister,
      handleSubmitRegister,

      nameRules: [
        (val) => val.length || 'nome obrigatório',
        (val) => val.length >= 5 || 'nome deve conter 5 ou mais caracters',
      ],
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
