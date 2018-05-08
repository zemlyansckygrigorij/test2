<template>
	<div class="account__template">
		<div class="account__heading">Счета</div>
		<div class="account__block">
			<div class="account__module" v-for="(item, index) of CardAccounts">
				<div class="account__segment m--first">
					<div class="account__currency" v-bind:style="'background-image:url(/public/i/png/'+ item.$.Currency + '.png);'"></div>
					<div class="account__information">
						<span class="account__name">{{ item.$.TypeAccount }}</span>
						<span class="account__number">{{ item.$.Account }}</span>
					</div>
				</div>
				<div class="account__segment m--last">
					<div class="account__residue">{{ item.$.Rest }}</div>
					<button class="account__button-open" v-on:click="clickUnderOpen" v-bind:id="'button-' + index"></button>

	                <div v-bind:id="'menu-' + index" v-bind:class="'account__menu is-' + Background">
	                    <div class="account__heading-menu">
	                        <button class="account__button-close" v-bind:data-id="index" v-on:click="clickUnderClose"></button>
	                        <div>{{ item.$.Account }}</div>
	                        <button class="account__button-search" v-bind:data-id="index" v-on:click="clickSearch"></button>
	                    </div>
	                    <div class="account__content">
		                    <div class="account__block-balance">
		                    	<span class="account__block-text">Остаток на карте</span>
		                    	<span class="account__block-text m--bold">{{ item.$.Rest }} {{ item.$.Currency }}</span>
		                    </div>

		                    <div class="account__undefined-pay" v-if="StatusPay">
		                    	По данному счету не было ни одной операции
		                    </div>
		                    <div class="account__undefined-pay" v-else>
		                    	тест
		                    </div>
		                </div>
	                </div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import mixinBackground from '../../mixins/mixin-background';
	import mixinСardHeader from '../../mixins/mixin-card-header.js';

	export default {
		mixins: [mixinBackground, mixinСardHeader],
		data () {
            return {
            	CardAccounts : this.CardAccounts,
            	StatusPay : this.StatusPay
            };
		},
		mounted() {

			this.$store.watch(() => this.$store.getters.CardAccounts, res => {
				let CardAccounts = res[0].Row;

			 	this.CardAccounts = CardAccounts;

			 	this.StatusPay = true;
			}, {
			  	immediate: true
			});
		},
	};
</script>