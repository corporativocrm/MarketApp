import { getNotifications, sendAnswer } from '../../config/api/notifications';

export default {
  name: 'notifications',
  namespaced: true,
  state: {
    dataNotifi: [],
    permision: '',
  },

  mutations: {
    SET_DATA(state, param) {
      if (param.data.response !== null
        && param.data.response !== undefined
        && param.data.response.length !== 0) {
        let flag = true;
        for (let i = 0; i < param.data.response.length; i += 1) {
          flag = true;
          for (let j = 0; j < state.dataNotifi.length; j += 1) {
            if (state.dataNotifi[j].id === param.data.response[i].id) {
              flag = false;
            }
          }
          if (flag) state.dataNotifi.push(param.data.response[i]);
        }
        state.dataNotifi.sort((a, b) => b.id - a.id);
        localStorage.setItem('list-notify', JSON.stringify(state.dataNotifi));
      }
    },
  },

  actions: {
    setAllNotifications({ commit }, param) {
      commit('SET_DATA', param);
    },
    async getAllNotifications({ commit, state }) {
      const r = [];
      if (state.dataNotifi.length) {
        state.dataNotifi.forEach((e) => {
          r.push({ id: e.id, view: e.view });
        });
      }
      commit('SET_DATA', await getNotifications({ data: JSON.stringify(r) }));
    },
    async sendAnswerNotify({ state }, param) {
      for (let i = 0; i < state.dataNotifi.length; i += 1) {
        if (state.dataNotifi[i].id === param.id) {
          state.dataNotifi[i].answer = { guid: param.id, text: param.answer };
        }
      }
      const r = await sendAnswer({ data: JSON.stringify(param) });
      localStorage.setItem('list-notify', JSON.stringify(state.dataNotifi));
      return r.data.response;
    },
    setViewNotify({ state }, index) {
      state.dataNotifi[index].view = true;
      localStorage.setItem('list-notify', JSON.stringify(state.dataNotifi));
    },

    async validatePermision({ state }) {
      state.permission = await Notification.requestPermission();
      return state.permision;
    },
  },
};
