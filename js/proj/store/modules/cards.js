const state = {

		// Данные по умолчанию для всех карт
	Cards: [
		{
			Row : [
				{
					$ : {
						IDCard : "12312312",
						NomCard: "**12312",
						Caption: "Visa Classic **12312",
						StatusCard: "1",
						TypeCard: "Visa Classic",
						AvailBalance: "0.0000",
						SCode: "RUR"
					}
				},
				{
					$ : {
						IDCard : "22222222",
						NomCard: "**22222",
						Caption: "Visa Classic **22222",
						StatusCard: "1",
						TypeCard: "Visa Classic",
						AvailBalance: "0.0000",
						SCode: "EUR"
					}
				}
			]
		} 
	],

		// Данные по умолчанию для выбранной карты
	chooseCard: [
		{	
			CardInfo : [
				{
					Row : {
						NomCard: "**12312",
						StatusCard: "Активна",
						DateEnd: "31.07.2016 00:00:00.000",
						AllBalance: "0.0000",
						IsDiscount: "0"
					}
				}
			],
			CardHistoryOperations : [
				{
					$ : {
						Znak : "-",
						Summa: "123123",
						TypeOper: "Оплата товаров (услуг) в торговой точке",
						Comment: 'Устр.865091(TSENTR TORGOVLI MOLNIYA8 CHELYABINSK )" T="31.10.2015 16:25:13.317',
						SCode: "RUR",
						Comission: "0.00 RUR",
						Summa2: "1496.1500",
						T: "31.10.2015 16:25:13.317"
					}
				},
				{
					$ : {
						Znak : "-",
						Summa: "123123",
						TypeOper: "Оплата товаров (услуг) в торговой точке",
						Comment: 'Устр.865091(TSENTR TORGOVLI MOLNIYA8 CHELYABINSK )" T="31.10.2015 16:25:13.317',
						SCode: "RUR",
						Comission: "0.00 RUR",
						Summa2: "1496.1500",
						T: "31.10.2015 16:25:13.317"
					}
				},
				{
					$ : {
						Znak : "-",
						Summa: "123123",
						TypeOper: "Оплата товаров (услуг) в торговой точке",
						Comment: 'Устр.865091(TSENTR TORGOVLI MOLNIYA8 CHELYABINSK )" T="31.10.2015 16:25:13.317',
						SCode: "RUR",
						Comission: "0.00 RUR",
						Summa2: "1496.1500",
						T: "31.10.2015 16:25:13.317"
					}
				},
				{
					$ : {
						Znak : "-",
						Summa: "123123",
						TypeOper: "Оплата товаров (услуг) в торговой точке",
						Comment: 'Устр.865091(TSENTR TORGOVLI MOLNIYA8 CHELYABINSK )" T="31.10.2015 16:25:13.317',
						SCode: "RUR",
						Comission: "0.00 RUR",
						Summa2: "1496.1500",
						T: "31.10.2015 16:25:13.317"
					}
				}
			]
		} 
	],

};

const mutations = {
  	setAuth(state, { type, items }) {
  	  	state[type] = items;
  	}
};

const getters = {
	Cards: 	(state, getters) => state.Cards,
	CardID: (state) => (id) => {
		const 	cardsArray = state.Cards,
				Row = cardsArray[0].Row,
				IDCard = Row[id].$.IDCard;

		return IDCard;
	},
	NomCard: 				(state, getters) => state.chooseCard[0].CardInfo[0].Row.NomCard,
	StatusCard: 			(state, getters) => state.chooseCard[0].CardInfo[0].Row.StatusCard,
	DateEnd: 				(state, getters) => state.chooseCard[0].CardInfo[0].Row.DateEnd,
	AllBalance: 			(state, getters) => state.chooseCard[0].CardInfo[0].Row.AllBalance,
	IsDiscount: 			(state, getters) => state.chooseCard[0].CardInfo[0].Row.IsDiscount,
	History: 				(state, getters) => state.chooseCard[0].CardHistoryOperations
};

export default {
    state,
    getters,
    mutations
};