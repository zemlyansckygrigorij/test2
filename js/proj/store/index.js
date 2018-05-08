    // Подключение базовых модулей
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

    // Подключение компонентов хранилища
import auth from './modules/auth';
import modal from './modules/modal';
import headerMain from './modules/headerMain';
import accounts from './modules/accounts';
import cards from './modules/cards';
import virtual from './modules/virtual';
import regular from './modules/regular';

Vue.use(Vuex);

const store = new Vuex.Store({
        // Импортирование state, getters и пр. в главный объект
    modules: {
        auth,
        modal,
        headerMain,
        accounts,
        cards,
        virtual,
        regular
    },
		// Непосредственное хранилище данных
	state: {

		news: [],

			// errors
		newsErrors: [],

        urlNews: 'http://www.uralprombank.ru/files/news.txt',

	},
        // Получение доступа к тем или иным переменным
	getters: {
        news: (state, getters) => state.news,
        activeBackground: (state, getters) => state.activeBackground,
	},
		// Мутации для изменения переменных в хранилище
  	mutations: {
  	  	set(state, { type, items }) {
  	  	  	state[type] = items;
  	  	}
  	},
  		// Actions для получения данных и сохранения в хранилище
  	actions: {
  	  	async news({ commit }, query) {

		    const url = this.state.urlNews;

            await axios.get(this.state.urlNews)
                .then(response => {
                	commit('set', { type: 'news', items: response.data });   
                })
                .catch(e => {
                	let 	error = [];
                			error = error.push(e);
                	commit('set', { type: 'newsErrors', items: error });
                });
  	  	}
  	}

});





export default store;
