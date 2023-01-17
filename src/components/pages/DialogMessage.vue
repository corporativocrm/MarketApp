<template>
  <v-row justify="center">
    <v-dialog
    content-class="mt-12"
    transition="scale-transition"
    persistent fullscreen
    origin="center center"
    v-model="showDialogMessage">
      <v-card>
        <v-row dense class="pa-2">
          <div style="overflow-y:auto;min-height:90vh;max-height:92vh;width:100%">

            <div v-if="viewNotify == -1">
              <v-list three-line>
                <template v-for="(item, index) in dataNotifi">
                  <!--v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader-->
                  <v-divider :key="index"></v-divider>
                  <v-list-item :key="item.title" @click="view(index)">
                    <v-list-item-avatar :color="profile.color" size="30">
                      <span class="white--text text-uppercase headline" v-text="item.from.name.slice(0,1)"> </span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        :class="item.view ? 'font-weight-regular':'font-weight-black'"
                        v-html="item.title">
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                      <v-list-item-subtitle v-text="(new Date(item.date)).toLocaleString()"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </div>

            <div v-if="viewNotify >= 0 && dataNotifi[viewNotify].type === 'question'">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-avatar :color="profile.color" size="30">
                      <span class="white--text text-uppercase headline" v-text="dataNotifi[viewNotify].from.name.slice(0,1)"> </span>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content class="caption">
                    <v-list-item-subtitle class="font-weight-bold text-capitalize" v-text="dataNotifi[viewNotify].from.name"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="dataNotifi[viewNotify].title"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="(new Date(dataNotifi[viewNotify].date)).toLocaleString()"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-spacer class="mt-2"></v-spacer>
                <v-container>
                  <v-textarea
                    outlined readonly rows="2" row-height="20"
                    label="MENSAJE"
                    :value="dataNotifi[viewNotify].body"
                  ></v-textarea>
                </v-container>
                <v-divider style="margin-top:-2rem;"></v-divider>
                <v-container>
                  <v-textarea
                    v-model="getAnswerItem"
                    outlined rows="2" row-height="20"
                    label="RESPUESTA"
                    :readonly="dataNotifi[viewNotify].answer.guid !== undefined"
                  ></v-textarea>
                </v-container>
              <v-container class="d-flex flex-row-reverse" style="margin-top:-2rem;">
                <v-btn
                  small
                  class="white--text"
                  color="primary"
                  :disabled="dataNotifi[viewNotify].answer.guid !== undefined"
                  @click="send()"
                  fab>
                  <v-icon dark>mdi-send</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn small class="white--text" color="error" fab>
                  <v-icon dark @click="view(-1)">close</v-icon>
                </v-btn>
              </v-container>
              </v-list-item-group>
            </div>

            <div v-if="viewNotify >= 0 && dataNotifi[viewNotify].type === 'info'">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-avatar :color="profile.color" size="30">
                      <span class="white--text text-uppercase headline" v-text="dataNotifi[viewNotify].from.name.slice(0,1)"> </span>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content class="caption">
                    <v-list-item-subtitle class="font-weight-bold text-capitalize" v-text="dataNotifi[viewNotify].from.name"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="(new Date(dataNotifi[viewNotify].date)).toLocaleString()"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-spacer class="mt-2"></v-spacer>
                <v-container>
                  <div v-html="dataNotifi[viewNotify].body"></div>
                </v-container>
              <v-container class="mt-1 d-flex flex-row-reverse">
                <v-btn
                  small
                  class="white--text"
                  color="primary"
                  @click="view(-1)"
                  fab>
                  <v-icon dark>mdi-check-all</v-icon>
                </v-btn>
              </v-container>
              </v-list-item-group>
            </div>
          </div>
        </v-row>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// eslint-disable-next-line import/extensions
import { mapState, mapActions } from 'vuex';

export default {
  name: 'modalNotify',
  data: () => ({
    viewNotify: -1,
    answer: '',
  }),
  computed: {
    ...mapState('menu', ['showDialogMessage']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('notifications', ['dataNotifi']),

    getAnswerItem: {
      get() {
        if (this.viewNotify >= 0 && this.viewNotify < this.dataNotifi.length) {
          if (this.dataNotifi[this.viewNotify].answer.guid !== undefined) {
            return this.dataNotifi[this.viewNotify].answer.text;
          }
        }
        return this.answer;
      },
      set(text) {
        this.answer = text;
      },
    },
  },
  methods: {
    ...mapActions('menu', ['toggleFormModalNotify']),
    ...mapActions('notifications', ['sendAnswerNotify']),

    close() {
      this.toggleFormModalNotify();
    },

    view(item) {
      if (item >= 0 && item < this.dataNotifi.length) {
        this.$store.dispatch('notifications/setViewNotify', item);
      }
      this.viewNotify = item;
    },

    async send() {
      if (navigator.onLine) {
        if (this.answer.trim().length > 1) {
          const response = await this.sendAnswerNotify({
            id: this.dataNotifi[this.viewNotify].id,
            answer: this.answer,
          });
          if (response) {
            this.alert('Respuesta enviada', 'success');
            this.answer = '';
          } else {
            this.alert('No se pudo enviar su respuesta', 'error');
          }
        } else {
          this.alert('Debe dar un respuesta', 'info');
        }
      } else {
        this.alert('Revise su conexion a internet', 'warning');
      }
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
};
</script>

<style>
.v-modal-overlay {
  z-index: 2000 !important;
}
</style>
