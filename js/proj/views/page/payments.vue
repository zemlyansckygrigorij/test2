<template>
	<div class="payments">
		<header id="headerMain" class="header">
			<HeaderComponent></HeaderComponent>
		</header>

	  	<div id="payments" class="payments__cluster page">
		  	<div class="payments__content">
				<div class="payments__block"> 
					<div class="payments__heading">Платежи</div>
					<div class="payments__block-list">
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/mobile-payment-ico.png');">
								<span class="payments__text">Мобильные платежи</span>
							</div>
							<div class="mobile-payment">
								<MobilePayment></MobilePayment>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/moment-payment-ico.png');">
								<span class="payments__text">Регулярные платежи</span>
							</div>
							<div class="regular-payment">
								<RegularPayment></RegularPayment>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/city-system-ico.png');">
								<span class="payments__text">Система «Город»</span>
							</div>
							<div class="system-city">
								<SystemCity></SystemCity>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/shtrafy-ico.png');">
								<span class="payments__text">Штрафы ГИБДД</span>
							</div>
							<div class="traffic-police">
								<TrafficPolice></TrafficPolice>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/gisgmp-ico.png');">
								<span class="payments__text">Госплатежи</span>
							</div>
							<div class="state-payments">
								<StatePayments></StatePayments>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/self-transfer-ico.png');">
								<span class="payments__text">Между своими счетами</span>
							</div>
							<div class="between-accounts">
								<BetweenAccounts></BetweenAccounts>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/other-client-ico.png');">
								<span class="payments__text">Перевод клиенту банка</span>
							</div>
							<div class="mobile-payment">
								<TransferBankClient></TransferBankClient>
							</div>
						</div>
						<div class="payments__item">
							<div class="payments__name" style="background-image: url('/public/i/png/other-bank-ico.png');">
								<span class="payments__text">Произвольный платеж</span>
							</div>
							<div class="mobile-payment">
								<RandomPayment></RandomPayment>
							</div>
						</div>
					</div>
				</div>
		  	</div>
	  	</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import HeaderComponent from '../layout/header-main.vue';
	import MobilePayment from '../component/mobile-payment.vue';
	import RegularPayment from '../component/regular-payment.vue';
	import SystemCity from '../component/system-city.vue';
	import TrafficPolice from '../component/traffic-police.vue';
	import StatePayments from '../component/state-payments.vue';
	import BetweenAccounts from '../component/between-accounts.vue';
	import TransferBankClient from '../component/transfer-bank-client.vue';
	import RandomPayment from '../component/random-payment.vue';

    import mixinCloseMenu from '../../mixins/mixin-close-menu.js';
	import mixinNameHeader from '../../mixins/mixin-name-header.js';

	import initHeightBlock from '../../common/initHeightBlock.js';

	export default {
		mixins: [mixinCloseMenu, mixinNameHeader],
		props: ['namePage'],
		data () {
			return {}
		},
		components: { 
			HeaderComponent,
			MobilePayment,
			RegularPayment,
			SystemCity,
			TrafficPolice,
			StatePayments,
			BetweenAccounts,
			TransferBankClient,
			RandomPayment
		},
		methods: {
	        updateDataQuestion () {
	                /** 
	                 * Валидация input и изменение placeholder 
	                 */
	            let Question = this.$refs.Question.value,
	            	requirement = (Question.length > 0);

	            formValidate(requirement, buttonMessage)
	        },
		},
        mounted () {
        	initHeightBlock(payments);
        }
	};
</script>