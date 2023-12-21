<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmitRegister">
      <p class="col-12 text-h6 text-center">
        Register Page
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Nome" v-model="formRegister.name" />
        <q-input label="Email" v-model="formRegister.email" />
        <q-input label="Password" v-model="formRegister.password" />
        <q-btn class="full-width" label="Register" color="primary" type="submit" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const formRegister = ref({
      name: '',
      email: '',
      password: '',
    });

    const handleSubmitRegister = async () => {
      try {
        await register(formRegister.value);
        router.push({
          name: 'email-confirmation',
          query: { email: formRegister.value.email },
        });
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      formRegister,
      handleSubmitRegister,
    };
  },
});
</script>
