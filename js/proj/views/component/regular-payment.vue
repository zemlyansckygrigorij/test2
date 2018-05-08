<template>
	<div class="regular-payment__template">
		<button id="regular-payment" class="regular-payment__button-open" v-on:click="clickUnderOpen"></button>

        <div id="regularPayment" v-bind:class="'regular-payment__menu is-' + Background">
            <div class="regular-payment__heading-menu">
                <button class="regular-payment__button-close" v-on:click="clickUnderClose"></button>
                <div>Регулярные платежи</div>
            </div>
            <div class="regular-payment__content">
            	<form name="regular-payment" class="form" v-on:submit.prevent="RegularPaymentButton">
            		<div id="stageOne" class="form__segment">
						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Со счета</span>
								<div class="form__block-double-init">
									<select name="pay" class="form__select" ref="pay" dir="rtl" @input="RegularPayment()">
										<option v-for="(item, index) of AccountsRegular" v-bind:value="item.$.ID" dir="ltr">{{ item.$.Account }} | {{ item.$.Rest }} {{ item.$.Currency }}</option>
									</select>
								</div>
							</div>
						</div>

						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Оператор</span>
								<div class="form__block-double-init">
									<select name="operator" class="form__select" dir="rtl" ref="operator" @input="RegularPayment()">
										<option value="" selected 	dir="ltr">Выбрать оператора</option>
										<option value="beeline" 	dir="ltr">Билайн</option>
										<option value="megafon" 	dir="ltr">Мегафон</option>
										<option value="mts" 		dir="ltr">МТС</option>
										<option value="tele2"		dir="ltr">TELE2</option>
										<option value="rtc"			dir="ltr">Ростелеком</option>
										<option value="other"		dir="ltr">Другие</option>
									</select>
								</div>
							</div>
						</div>

						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Номер л/с</span>
								<div class="form__block-double-init">
									<input id="personalPay" class="form__input-reset js-input" ref="personalPay" type="number" dir="rtl" @input="RegularPayment()">
									<label for="personalPay" class="form__label-placeholder m--right" data-placeholder="123***890"></label>
								</div>
							</div>
							<div class="form__block-double-item">
								<span>Сумма</span>
								<div class="form__block-double-init">
									<input id="value" class="form__input-reset js-input" ref="value" type="number" dir="rtl" @input="RegularPayment()">
									<label for="value" class="form__label-placeholder m--right" data-placeholder="100"></label>
								</div>
							</div>
						</div>

						<div class="form__block m--button-inside">
							<div id="RegularPaymentButtonNext" class="form__button m--shadow">Дальше</div>
						</div>
            		</div>
            	</form>
            </div>
        </div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import mixinBackground from '../../mixins/mixin-background';
	import mixinCloseMenu from '../../mixins/mixin-close-menu';

	import placeholderChange from '../../common/placeholderChange';
	import formValidate from '../../common/validateForm';

	export default {
		mixins: [mixinBackground, mixinCloseMenu],
		data () {
			return {
				AccountsRegular: this.AccountsRegular
			}
		},
		methods: {
	        clickUnderClose (e) {
	            let object = document.getElementById("regularPayment");

	            object.classList.remove("is-active");
	        },
			RegularPaymentButton(submitEvent) {
				
			},
			RegularPayment() {
	            let pay = this.$refs.pay.value,
	                operator = this.$refs.operator.value,
	                personalPay = this.$refs.personalPay.value,
	                value = this.$refs.value.value,
	                requirement = (pay.length > 0) && (operator.length > 0) && (personalPay.length > 0) && (value.length > 0);

	                formValidate(requirement, RegularPaymentButtonNext);
			}, 
		},
        mounted () {
	            /** 
	             * Убираем/возвращаем placeholder
	             */
	        placeholderChange();

			this.$store.watch(() => this.$store.getters.AccountsRegular, res => {
				let AccountsRegular = res;

			 	this.AccountsRegular = AccountsRegular;
			}, {
			  	immediate: true
			});
        }
	};
</script>