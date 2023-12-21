<template>
  <q-page padding>
    <h6>
      Obrigado por se registrar!
    </h6>
    <p class="text-body1">
      Por favor entre em sua caixa de email e confirme seu email
      <strong>{{ $route.query.email }}</strong>, <br> para finalizar o registro.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',

});
</script>
