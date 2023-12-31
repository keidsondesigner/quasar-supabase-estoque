<template>
  <q-page padding>
    <h6>
      Obrigado por se registrar!
    </h6>
    <p class="text-body1">
      Por favor entre em sua caixa de email e confirme seu email
      <strong>{{ $route.query.email }}</strong>, <br> para finalizar o registro.
    </p>
    <q-btn
      class="full-width"
      label="Ir para o Login"
      color="primary"
      flat
      :to="{ name: 'login' }"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',

});
</script>
