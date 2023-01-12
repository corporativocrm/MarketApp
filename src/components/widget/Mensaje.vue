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
            <v-btn @click="cerrar" outlined>Aceptar</v-btn>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapActions, mapState } from 'vuex';

export default {
  name: 'modalAlert',
  computed: {
    ...mapState('mensaje', ['showModalAlert', 'mensaje', 'tipo']),
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
