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
        <q-file
          v-model="avatarUrl.avatar"
          label="Imagem"
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { validateEmail } from 'src/utils/ValidateForm';
import useSupabase from 'src/boot/supabase';

const { supabase } = useSupabase();

const router = useRouter();

const { register } = useAuthUser();

const { notifyError, notifySuccess } = useNotify();

const formRegister = ref({
  name: '',
  email: '',
  password: '',
  admin: false,
});
const avatarUrl = ref({
  avatar: null,
});

const nameRules = ref([
  (val) => val.length || 'nome obrigatório',
  (val) => val.length >= 5 || 'nome deve conter 5 ou mais caracters',
]);
const emailRules = ref([
  (val) => val.length || 'email obrigatório',
  (val) => validateEmail(val) || 'email inválido',
]);
const passwordRules = ref([
  (val) => val.length || 'senha obrigatória',
  (val) => val.length >= 6 || 'senha deve conter 6 ou mais caracters',
]);

const handleSubmitRegister = async () => {
  try {
    const filename = `public/avatar_${Date.now()}.${avatarUrl.value.avatar.name.split('.').pop()}`;
    await supabase
      .storage
      .from('avatars')
      .upload(filename, avatarUrl.value.avatar, {
        cacheControl: '3600',
        upsert: false,
      });

    await register(formRegister.value);
    notifySuccess('Registro efetuado!');
    avatarUrl.value.avatar = null;
    router.push({
      name: 'email-confirmation',
      query: { email: formRegister.value.email },
    });
  } catch (error) {
    notifyError(error.message);
  }
};

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
