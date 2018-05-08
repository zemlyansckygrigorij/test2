const state = {
	AccountsVirtual: [
		{
			Row : [
				{
					$ : {
						ID : "151***",
						Account : "123123123123123123",
						Currency : "RUR",
						Rest : "0.0000",
						Caption : "Карточный счет",
						isArresed : 0,
						IsClosed : 0,
					}
				},
				{
					$ : {
						ID : "152***",
						Account : "213213123123213",
						Currency: "EUR",
						Rest: "0.0000",
						Caption: "Карточный счет",
						isArresed: 0,
						IsClosed: 0,
					}
				}
			]
		} 
	]
};

const mutations = {
  	setVirtual(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const getters = {
	AccountsVirtual: (state, getters) => state.AccountsVirtual[0].Row
};

export default {
    state,
    getters,
    mutations
};