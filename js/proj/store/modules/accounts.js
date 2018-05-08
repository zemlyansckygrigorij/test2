const state = {
	CardAccounts: [
		{
			Row : [
				{
					$ : {
						Account : "123123123123123123",
						Currency: "RUR",
						Rest: "0.0000",
						TypeAccount: "Карточный счет"
					}
				},
				{
					$ : {
						Account : "123123123123123123",
						Currency: "EUR",
						Rest: "0.0000",
						TypeAccount: "Карточный счет"
					}
				}
			]
		} 
	],
	CurrentAccounts: [],
	DepositAccounts: []
};

const mutations = {
  	setAccounts(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const getters = {
	CardAccounts: 		(state, getters) => state.CardAccounts,
	CurrentAccounts: 	(state, getters) => state.CurrentAccounts,
	DepositAccounts: 	(state, getters) => state.DepositAccounts
};

export default {
    state,
    getters,
    mutations
};