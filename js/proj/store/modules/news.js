/*!
	\todo 	При подключении данного модуля и удаления дублируемого кода из index.js не подгружаются новости
			Нужно правильно подключить блок

*/

import axios from 'axios';

const state = {
	news: [],

	newsErrors: [],

    urlNews: 'http://www.uralprombank.ru/files/news.txt'
};

const getters = {
    news: (state, getters) => state.news
};

const mutations = {
  	set(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const actions = {
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
};

export default {
    state,
    getters,
    mutations,
    actions
};
