import { getAllMessages, getConversation, sendAnswer } from '../../config/api/messenger';

export default {
  name: 'messenger',
  namespaced: true,
  state: {
    messageList: [],
    messageText: [],
  },

  mutations: {

    SET_LIST(state, param) {
      if (param.data.response !== null
        && param.data.response !== undefined
        && param.data.response.length !== 0) {
        state.messageList = param.data.response;
        state.messageList.sort((a, b) => ((new Date(b.date)).getTime()) - ((new Date(a.date)).getTime()));
      }
    },

    SET_TEXT(state, param) {
      if (param.data.response !== null
        && param.data.response !== undefined
        && param.data.response.length !== 0) {
        state.messageText = param.data.response;
      }
    },
  },

  actions: {

    async getAllMessagesHead({ commit }) {
      commit('SET_LIST', await getAllMessages());
    },

    async getMessagesText({ commit }, param) {
      commit('SET_TEXT', await getConversation(param));
    },

    clearMessagesText({ state }) {
      state.messageText = [];
    },

    async sendMessage(param) {
      const r = await sendAnswer(param);
      return r.data.response;
    },

    setViewNotify({ state }, index) {
      state.messageList[index].view = true;
    },
  },
};
