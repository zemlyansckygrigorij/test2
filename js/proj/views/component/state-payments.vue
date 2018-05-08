<template>
	<div class="state-payments__template">
		<button id="state-payments" class="state-payments__button-open" v-on:click="clickUnderOpen"></button>

        <div id="statePayments" v-bind:class="'state-payments__menu is-' + Background">
            <div class="state-payments__heading-menu">
                <button class="state-payments__button-close" v-on:click="clickUnderClose"></button>
                <div>Поиск госплатежей</div>
            </div>
            <div class="state-payments__content">
            	<form name="regular-payment" class="form" v-on:submit.prevent="TrafficPoliceButton">
            		<div id="stageOne" class="form__segment">
						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>Паспорт РФ</span>
								<div class="form__block-double-init">
									<input id="pasport" class="form__input-reset js-input" ref="pasport" type="number" value="000000000000" @input="StatePayments()">
									<label for="pasport" class="form__label-placeholder m--left m--bold" data-placeholder="77 77 777777"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>ИНН</span>
								<div class="form__block-double-init">
									<input id="inn" class="form__input-reset js-input" ref="inn" type="number" value="000000000000" @input="StatePayments()">
									<label for="inn" class="form__label-placeholder m--left m--bold" data-placeholder="000000000000"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>Уникальный идентификатор начисления (УИН) или номер постановления</span>
								<div class="form__block-double-init m--right">
									<input id="identifierState" class="form__input-reset js-input" ref="identifierState" type="number" dir="rtl" @input="StatePayments()">
									<label for="identifierState" class="form__label-placeholder m--right" data-placeholder="20 цифр"></label>
								</div>
							</div>
						</div>

						<div class="form__block m--button-inside">
							<div id="StatePaymentsButtonNext" class="form__button m--shadow">Проверить</div>
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
			}
		},
		methods: {
	        clickUnderClose (e) {
	            let object = document.getElementById("statePayments");

	            object.classList.remove("is-active");
	        },
	        StatePayments () {
	            let pasport = this.$refs.pasport.value,
	                inn = this.$refs.inn.value,
	                identifier = this.$refs.identifierState.value,
	                requirement = (pasport.length > 0) && (inn.length > 0) && (identifier.length > 0);

	                formValidate(requirement, StatePaymentsButtonNext);
	        }
		},
        mounted () {
	            /** 
	             * Убираем/возвращаем placeholder
	             */
	        placeholderChange();
        }
	};
</script>