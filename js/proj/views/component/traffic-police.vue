<template>
	<div class="traffic-police__template">
		<button id="traffic-police" class="traffic-police__button-open" v-on:click="clickUnderOpen"></button>

        <div id="trafficPolice" v-bind:class="'traffic-police__menu is-' + Background">
            <div class="traffic-police__heading-menu">
                <button class="traffic-police__button-close" v-on:click="clickUnderClose"></button>
                <div>Поиск платежей ГИБДД</div>
            </div>
            <div class="traffic-police__content">
            	<form name="regular-payment" class="form" v-on:submit.prevent="TrafficPoliceButton">
            		<div id="stageOne" class="form__segment">
						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>Водительское удостоверение</span>
								<div class="form__block-double-init m--right">
									<input id="certificate" class="form__input-reset js-input" ref="certificate" type="text" dir="rtl" @input="TrafficPolice()">
									<label for="certificate" class="form__label-placeholder m--right" data-placeholder="12АБ123456"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>Свидетельство о регистрации транспортного средства</span>
								<div class="form__block-double-init m--right">
									<input id="diploma" class="form__input-reset js-input" ref="diploma" type="text" dir="rtl" @input="TrafficPolice()">
									<label for="diploma" class="form__label-placeholder m--right" data-placeholder="12АБ123456"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double m--no-margin">
							<div class="form__block-double-item m--column-margin">
								<span>Уникальный идентификатор начисления (УИН) или номер постановления</span>
								<div class="form__block-double-init m--right">
									<input id="identifierTraffic" class="form__input-reset js-input" ref="identifierTraffic" type="number" dir="rtl" @input="TrafficPolice()">
									<label for="identifierTraffic" class="form__label-placeholder m--right" data-placeholder="20 цифр"></label>
								</div>
							</div>
						</div>

						<div class="form__block m--button-inside">
							<div id="TrafficPoliceButtonNext" class="form__button m--shadow">Проверить</div>
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
	            let object = document.getElementById("trafficPolice");

	            object.classList.remove("is-active");
	        },
	        TrafficPolice () {
	            let certificate = this.$refs.certificate.value,
	                diploma = this.$refs.diploma.value,
	                identifier = this.$refs.identifierTraffic.value,
	                requirement = (certificate.length > 0) && (diploma.length > 0) && (identifier.length > 0);

	                formValidate(requirement, TrafficPoliceButtonNext);
	        },
	        TrafficPoliceButton (submitEvent) {

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