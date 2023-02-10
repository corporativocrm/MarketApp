<template>
  <v-row justify="center">
    <v-dialog
    content-class="mt-12"
    persistent fullscreen
    :no-click-animation="true"
    origin="center center"
    v-model="showForm"
    transition="dialog-bottom-transition">
      <v-card>
        <v-row dense class="pa-2">
          <div style="overflow-y:auto;min-height:90vh;max-height:92vh;width:100%">

            <div v-if="viewNotify == -1 && !messageDirect">
              <v-list three-line>
                <template v-for="(item, index) in messageList">
                  <v-divider :key="index"></v-divider>
                  <v-list-item :key="item.title" @click="view(index)">
                    <v-list-item-avatar color="lightslategray" size="60">
                      <v-img
                        containt
                        alt="loading"
                        lazy-src="system/no-image.webp"
                        :src="'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.reference, '.webp')"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        :class="parseInt(item.view, 10) ? 'font-weight-regular':'font-weight-black'"
                        v-html="item.title">
                      </v-list-item-title>
                      <v-list-item-subtitle v-text="(new Date(item.date)).toLocaleString()"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </div>

            <div v-if="(viewNotify >= 0 && headConversation.type === 'question') || messageDirect">
              <v-list-item-group>
                <v-list-item style="padding:0;border-bottom:1px solid lightslategray">
                  <v-list-item-icon style="margin: auto 8px auto 0;">
                    <v-icon :color="profile.color" large @click="view(-1)">mdi-chevron-left</v-icon>
                    <v-avatar color="lightslategray" size="60" style="top:3px">
                      <v-img
                        containt
                        alt="loading"
                        lazy-src="system/no-image.webp"
                        :src="headConversation.image"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content class="caption pb-1">
                    <v-list-item-subtitle class="font-weight-bold text-capitalize">{{headConversation.head}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-text="headConversation.title"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="headConversation.date"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <div id="containerMessage" style="margin-top:8px;overflow-y:auto;min-height:70vh;">
                  <v-container id="containerMessageText">
                    <v-row class="pa-0">
                      <template v-for="(item, index) in listMessageText">
                        <v-col :key="index" cols="11"
                        :class="(item.me?'ml-7':'mr-1')+' pa-0'">
                          <v-alert
                            :color="item.me?'green':'cyan'"
                            :border="item.me?'right':'left'"
                            elevation="4"
                            colored-border>
                            <v-row align="start">
                              <v-col cols="12" style="padding:4px 8px 0 8px;">
                                {{item.message}}
                              </v-col>
                              <v-col cols="12" class="text-end" style="padding:0 8px 0 0;">
                                <small>{{getTime(item.date)}}</small>
                              </v-col>
                            </v-row>
                          </v-alert>
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
                </div>

                <v-container>
                  <v-row align="center" style="overflow:hidden;border-top:1px solid lightslategray">
                    <v-col cols="12" class="ma-0 pa-0">
                      <v-textarea
                        v-model="answer"
                        outlined no-resize flat hide-details
                        append-outer-icon="mdi-send"
                        rows="2" row-height="25"
                        placeholder="RESPUESTA"
                        @click:append-outer="send()"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-group>
            </div>

            <div v-if="viewNotify >= 0 && headConversation.type === 'info'">
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-avatar :color="profile.color" size="30">
                      <span class="white--text text-uppercase headline">{{viewNotify}}</span>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content class="caption">
                    <v-list-item-subtitle class="font-weight-bold text-capitalize">{{viewNotify}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-text="(new Date(messageList[viewNotify].date)).toLocaleString()"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-spacer class="mt-2"></v-spacer>
                <v-container>
                  <div v-html="messageList[viewNotify].message"></div>
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
// eslint-disable-next-line import/extensions
import { sendAnswer } from '../../config/api/messenger';

export default {
  name: 'DialogMessage',
  data: () => ({
    viewNotify: -1,
    answer: '',
    idTimer: -1,
  }),
  computed: {
    ...mapState('menu', ['showDialogMessage']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('messenger', ['messageList', 'messageText']),
    ...mapState('catalogue', ['itemView', 'messageDirect']),

    showForm: {
      get() {
        return this.showDialogMessage;
      },
    },

    headConversation: {
      get() {
        const data = {
          id: -1,
          head: 'Hacer una pregunta',
          image: 'system/no-image.webp',
          title: '',
          type: 'info',
          reference: '',
          date: '',
        };

        if (this.messageDirect && this.itemView !== null) {
          const exist = this.messageList.findIndex((i) => i.reference === this.itemView.code);

          if (exist < 0) {
            const now = new Date();
            data.head = 'Hacer una pregunta';
            data.image = 'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(this.itemView.code, '.webp');
            data.title = this.itemView.name;
            data.type = 'question';
            data.reference = this.itemView.id;
            data.date = now.toLocaleDateString().concat(' ', now.toLocaleTimeString());
          } else {
            const item = this.messageList[exist];
            data.id = item.id;
            data.head = 'Hacer una pregunta';
            data.image = 'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.reference, '.webp');
            data.title = item.title;
            data.type = item.type;
            data.date = item.date;
          }
        } else if (this.viewNotify >= 0) {
          const item = this.messageList[this.viewNotify];
          data.id = item.id;
          data.head = 'Hacer una pregunta';
          data.image = 'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.reference, '.webp');
          data.title = item.title;
          data.type = item.type;
          data.date = item.date;
        }

        return data;
      },
    },

    listMessageText: {
      get() {
        if (this.messageDirect && this.itemView !== null) {
          const exist = this.messageList.findIndex((i) => i.reference === this.itemView.code);
          if (exist >= 0) {
            this.$store.dispatch('messenger/getMessagesText', this.messageList[exist].id);
          }
        }

        return this.messageText;
      },
    },
  },
  methods: {
    ...mapActions('menu', ['toggleFormModalNotify']),

    getTime(date) {
      const fecha = new Date(date);
      const hora = fecha.getHours();
      const minuto = fecha.getMinutes();
      let ampm = 'am';
      let r = '';

      if (hora > 12) {
        r = (hora - 12).toString();
        ampm = 'pm';
      } else {
        r = hora.toString();
      }

      if (minuto < 10) {
        r = r.concat(':0', minuto.toString());
      } else {
        r = r.concat(':', minuto.toString());
      }

      r = r.concat(ampm);

      return r;
    },

    view(item) {
      if (item >= 0) {
        if (this.messageDirect && this.itemView !== null) {
          this.$store.dispatch('messenger/getMessagesText', item);
        } else {
          this.$store.dispatch('messenger/getMessagesText', this.messageList[item].id);
        }
      } else {
        this.$store.dispatch('messenger/getAllMessagesHead');
        this.$store.dispatch('messenger/clearMessagesText');
        if (this.messageDirect) {
          this.$store.dispatch('catalogue/setMessageDirect', false);
        }
      }
      this.viewNotify = item;
    },

    async send() {
      if (navigator.onLine) {
        if (this.answer.trim().length > 1) {
          const param = {
            id: this.headConversation.id,
            answer: this.answer,
            title: this.messageDirect ? this.headConversation.title : '',
            reference: this.headConversation.reference,
          };

          const response = await sendAnswer({ data: JSON.stringify(param) });
          if (response.data.response) {
            this.alert('Respuesta enviada', 'success');
            this.answer = '';
            this.view(response.data.response > 1 ? response.data.response : this.viewNotify);
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
  watch: {
    showForm: {
      handler(show) {
        if (show) {
          // Forzar la descarga
          if (navigator.onLine) {
            this.$store.dispatch('messenger/getAllMessagesHead');
          }
        } else if (this.messageDirect) {
          this.$store.dispatch('catalogue/setMessageDirect', false);
        }
      },
    },
    listMessageText: {
      handler() {
        setTimeout(() => {
          const container = document.querySelector('#containerMessage');
          const slide = document.querySelector('#containerMessageText');

          if (container !== null) {
            if (slide !== null) {
              container.scrollTop = slide.scrollHeight;
            }
          }
        }, 500);
      },
    },
  },
};
</script>

<style>
.v-modal-overlay {
  z-index: 2000 !important;
}
</style>
