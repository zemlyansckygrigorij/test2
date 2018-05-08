const state = {

		// IP/Time
	IP: "00.000.000.000",
	TimeLastEnter: "00.00.0000 00:00:00",

		// Avatar
	Data: "test0000",
	MIME: "image/png",

		// Bonus
	ballBonus: "test",
	BonusColor: "#202020",

		// Name User
	Family: "Тест1",
	Name: "Тест2",
	Otchestvo: "Тест3",

		// currencies
	CBUSD: "00.0000",
	sellUSD: "00.0",
	buyUSD: "00.0",

	CBGBP: "00.0000",
	sellGBP: "00.0",
	buyGBP: "00.0",

	CBEUR: "00.0000",
	sellEUR: "00.0",
	buyEUR: "00.0"
};

const mutations = {
  	setHeaderMain(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const getters = {
	IP: 	(state, getters) => state.IP,
	TimeLastEnter: 	(state, getters) => state.TimeLastEnter,
	Data: 			(state, getters) => state.Data,
	MIME: 			(state, getters) => state.MIME,
	ballBonus: 	(state, getters) => state.ballBonus,
	BonusColor: 	(state, getters) => state.BonusColor,
	Family: 		(state, getters) => state.Family,
	Name: 	(state, getters) => state.Name,
	Otchestvo: (state, getters) => state.Otchestvo,
	CBUSD: 			(state, getters) => state.CBUSD,
	sellUSD: 		(state, getters) => state.sellUSD,
	buyUSD: 		(state, getters) => state.buyUSD,
	CBGBP: 			(state, getters) => state.CBGBP,
	sellGBP: 		(state, getters) => state.sellGBP,
	buyGBP: 		(state, getters) => state.buyGBP,
	CBEUR: 			(state, getters) => state.CBEUR,
	sellEUR: 		(state, getters) => state.sellEUR,
	buyEUR: 		(state, getters) => state.buyEUR
};

export default {
    state,
    getters,
    mutations
};