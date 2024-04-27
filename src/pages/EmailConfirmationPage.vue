<template>
  <q-page padding class="container__page row">
    <div class="col-10">
      <h6 class="q-mb-md">
        Obrigado por se registrar!
      </h6>
      <p>
        Para finalizar o registro.<br>
        Por favor entre em sua caixa de email e confirme seu email.<br>
        <strong>{{ $route.query.email }}</strong>
      </p>
      <q-btn
        class="full-width"
        label="Ir para o Login"
        color="primary"
        flat
        no-caps
        :to="{ name: 'login' }"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',

});
</script>
<style lang="scss" scoped>
.container__page {
  min-height: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
