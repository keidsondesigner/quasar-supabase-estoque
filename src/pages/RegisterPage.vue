<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmitRegister">
      <p class="col-12 text-h6 text-center">
        Register Page
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
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
        <q-btn class="full-width" label="Register" color="primary" type="submit" />
        <q-btn class="full-width" label="Voltar" color="primary" flat to="/" />
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
