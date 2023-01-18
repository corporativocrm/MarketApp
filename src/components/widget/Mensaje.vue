<template>
    <v-bottom-sheet
      content-class="v-modal-overlay"
      transition="fab-transition"
      v-model="showModalAlert"
      persistent>
        <v-sheet class="text-center" height="150">
            <v-alert :type="tipo">
              <strong class="overline font-weight-medium"
              style="line-height:0;letter-spacing:0.1em !important;">
                {{ mensaje }}
              </strong>
            </v-alert>
            <div class="d-flex justify-space-around">
              <v-btn dark outlined v-if="condition" @click="cerrar(false)" color="red">Cancelar</v-btn>
              <v-btn @click="cerrar(true)" outlined color="primary">Aceptar</v-btn>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapActions, mapState } from 'vuex';

export default {
  name: 'modalAlert',
  computed: {
    ...mapState('mensaje', ['showModalAlert', 'mensaje', 'tipo', 'condition']),
  },
  methods: {
    ...mapActions('mensaje', ['cerrar']),
  },
};
</script>

<style>
.v-modal-overlay {
  z-index: 2000 !important;
}
</style>
