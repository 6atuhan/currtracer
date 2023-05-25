
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list:[
      ['symbol', 'amounth', 'lastPrice', 'weightedAvgPrice'],
    ],
    binancelist:null
  },
  mutations: {
    updateAmount(state, info) {
      const { symbol, newAmount } = info;
      const index = state.list.findIndex(item => item[0] === symbol);
      if (index !== -1) {
        state.list[index][1] = newAmount*1;
        //güncelleme değişimi için boş bi index ekleyip siliyorum  :D
        state.list.push("")
        state.list.pop()
      }
    },
    addCurrency(state,currency){
    state.list.push(currency)
    },
    deleteCurrency(state,currency){
      console.log('state.list :>> ', state.list);
      state.list = state.list.filter(i => i != currency)
      console.log('state.list :>> ', state.list);


    }
  },
  actions: {
    updateAmount({ commit }, info) {
      commit('updateAmount', info);
    },
    addCurrency({commit},currency){
      commit('addCurrency',currency)
    },
    deleteCurrency({commit},currency){
      commit('deleteCurrency',currency)
    }
  },
  modules: {},
});
