const state = {
		/** 
		 * Номер Scratch-карты, полученный после первой авторизации.
		 * Используется во второй авторизации
		 */
	NumberCard: "000000",

		/**
		 * Ключ на Scratch-карте для указания, какой скрытый код отправлять во второй авторизации
		 */
	NumberKey: "000",

		/**
		 * Уникальный одноразовый код для работы приложения. Не используется при первой авторизации
		 */
	Context: "none",

		/**
		 * Статус работы приложения
		 * true - приложение будет работать 
		 * false - работа приложения блокируется. 
		 */
	appStatus: false,
};

const mutations = {
  	setAuth(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const getters = {
	NumberCard: 	(state, getters) => state.NumberCard,
	NumberKey: 		(state, getters) => state.NumberKey,
	Context: 		(state, getters) => state.Context,
	appStatus: 		(state, getters) => state.appStatus,
};

const actions = {
    resetContext({ commit }, query) {
        commit('setAuth', { type: 'Context', items: "none" });
    },

    resetAuth({ commit }, query) {
        commit('setAuth', { type: 'authStatus', items: false });
    },
    runAuth({ commit }, query) {
        commit('setAuth', { type: 'authStatus', items: false });
    },
    
    resetApp({ commit }, query) {
        commit('setAuth', { type: 'appStatus', items: false });
    },
    runApp({ commit }, query) {
        commit('setAuth', { type: 'appStatus', items: true });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};