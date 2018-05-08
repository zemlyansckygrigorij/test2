<template>
	<div class="virtual__template">
		<button id="button-virtual" class="virtual__button" v-on:click="clickUnderOpen">Заказать виртуальную карту</button>

        <div id="virtual" v-bind:class="'virtual__menu is-' + Background">
            <div class="virtual__heading-menu">
                <button class="virtual__button-close" v-on:click="clickUnderClose"></button>
                <div>Заказ виртуальной карты</div>
            </div>
            <div class="virtual__content">
            	<form name="virtual-new" class="form" v-on:submit.prevent="VirtualNewButton">
            		<div id="stageOne" class="form__segment">
						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Срок действия</span>
								<div class="form__block-double-init">
									<select name="time" class="form__select" dir="rtl" ref="time" @input="VirtualNew()">
										<option value="1" selected="" dir="ltr">1 месяц</option>
										<option value="3" dir="ltr">3 месяца</option>
										<option value="6" dir="ltr">6 месяцев</option>
										<option value="12" dir="ltr">12 месяцев</option>
									</select>
								</div>
							</div>
						</div>

						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Лимит суммы</span>
								<div class="form__block-double-init">
									<input id="limit" class="form__input-reset js-input" ref="limit" type="number" dir="rtl" @input="VirtualNew()">
									<label for="limit" class="form__label-placeholder m--right" data-placeholder="50000"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double">
							<div class="form__block-double-item">
							<span>Количество покупок</span>
								<div class="form__block-double-init">
									<input id="buy" class="form__input-reset js-input" ref="buy"  type="number" dir="rtl" @input="VirtualNew()">
									<label for="buy" class="form__label-placeholder m--right" data-placeholder="30"></label>
								</div>
							</div>
						</div>

						<div class="form__block-double">
							<div class="form__block-double-item">
								<span>Привязать к счёту</span>
								<div class="form__block-double-init">
									<select name="pay" class="form__select" ref="pay" dir="rtl" @input="VirtualNew()">
										<option v-for="(item, index) of AccountsVirtual" v-bind:value="item.$.ID" dir="ltr">{{ item.$.Account }} | {{ item.$.Rest }} {{ item.$.Currency }}</option>
									</select>
								</div>
							</div>
						</div>

						<div class="form__block m--button-inside">
							<div id="ButtonNext" class="form__button m--shadow">Дальше</div>
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
				AccountsVirtual: this.AccountsVirtual
			}
		},
		methods: {
			VirtualNewButton(submitEvent) {

			},
			VirtualNew() {
	            let time = this.$refs.time.value,
	                limit = this.$refs.limit.value,
	                buy = this.$refs.buy.value,
	                pay = this.$refs.pay.value,
	                requirement = (limit.length > 0) && (buy.length > 0);

	                formValidate(requirement, ButtonNext);
			}, 
	        clickUnderClose (e) {
	            const 	object = document.getElementById('virtual');

	            object.classList.remove("is-active");
	        }
		},
        mounted () {
	            /** 
	             * Убираем/возвращаем placeholder
	             */
	        placeholderChange();

			this.$store.watch(() => this.$store.getters.AccountsVirtual, res => {
				let AccountsVirtual = res;

			 	this.AccountsVirtual = AccountsVirtual;
			}, {
			  	immediate: true
			});
        }
	};
</script>