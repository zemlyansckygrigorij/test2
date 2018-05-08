<template>
	<div class="cards">
		<header id="headerMain" class="header">
			<HeaderComponent></HeaderComponent>
		</header>

	  	<div id="cards" class="cards__cluster page">
	  		<div class="cards__content">
				<div class="cards__block">
					<div class="cards__module" v-for="(item, index) of Cards">
						<div class="cards__segment m--first">
							<div class="cards__currency" v-bind:style="'background-image:url(/public/i/png/'+ item.$.SCode + '.png);'"></div>
							<div class="cards__information">
								<span class="cards__name">{{ item.$.Caption }}</span>
								<span class="cards__number">{{ item.$.NomCard }}</span>
							</div>
						</div>
						<div class="cards__segment m--last">
							<div class="cards__residue">{{ item.$.AvailBalance }}</div>
							<button class="cards__button-open" v-on:click="clickUnderOpen" v-bind:data-index="index"></button>
						</div>
					</div>

	                <div id="cardChoose" v-bind:class="'cards__menu is-' + Background">
	                    <div class="cards__heading-menu">
	                        <button class="cards__button-close" v-on:click="clickUnderClose"></button>
	                        <div>{{ NomCard }}</div>
	                        <button class="cards__button-search" v-on:click="clickSearch"></button>
	                    </div>
	                    <div class="cards__content">
		                    <div class="cards__block-balance">
		                    	<span class="cards__block-text">Остаток на карте</span>
		                    	<span class="cards__block-text m--bold">{{ AllBalance }}</span>
		                    </div>
		                    <div class="cards__block-date">
		                    	<span class="cards__block-text">Дата конца срока</span>
		                    	<span class="cards__block-text m--bold">{{ DateEnd }}</span>
		                    </div>
							
		                    <div class="cards__pay">
			                    <div class="cards__pay-section" v-if="StatusPay" v-for="(item, index) of History">
			                    	<div class="cards__pay-block">
			                    		<div class="cards__pay-date">{{ item.$.T }}</div>
			                    		<div class="cards__pay-information">
		                    				<div class="cards__pay-name">{{ item.$.TypeOper }}</div>
		                    				<div class="cards__pay-device">{{ item.$.Comment }}</div>
			                    			<div class="cards__pay-value">{{ item.$.Znak }}{{ item.$.Summa2 }} {{ item.$.SCode }}</div>
			                    		</div>
			                    	</div>
			                    </div>
			                    <div class="account__undefined-pay" v-else>
			                    	По данному счету не было ни одной операции
			                    </div>
		                    </div>
		                </div>
	                </div>
				</div>

				<div class="virtual">
					<VirtualCards></VirtualCards>
				</div>
	  		</div>
	  	</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import HeaderComponent from '../layout/header-main.vue';
	import VirtualCards from '../component/virtual-cards.vue';

	import axios from 'axios';

	import initHeightBlock from '../../common/initHeightBlock.js';

	import mixinBackground from '../../mixins/mixin-background';
	import mixinСardHeader from '../../mixins/mixin-card-header.js';
	import mixinNameHeader from '../../mixins/mixin-name-header.js';

	export default {
		mixins: [mixinBackground, mixinСardHeader, mixinNameHeader],
		props: ['namePage'],
		data () {
			return {
            	Cards : this.Cards,

            		// Информация по отдельной карте
            	NomCard 	: this.NomCard,
            	StatusCard	: this.StatusCard,
            	DateEnd 	: this.DateEnd,
            	AllBalance 	: this.AllBalance,
            	History 	: this.History,
            	StatusPay 	: this.StatusPay,
			}
		},
		components: { 
			HeaderComponent,
			VirtualCards
		},
		methods: {
	        clickUnderOpen (e) {
	            const 	object = document.getElementById('cardChoose');

	            const 	index = e.target.attributes[0].value,
	            		card = this.$store.getters.CardID(index);

				this.NomCard 	= this.$store.getters.NomCard;
				this.StatusCard = this.$store.getters.StatusCard;
				this.DateEnd 	= this.$store.getters.DateEnd;
				this.AllBalance = this.$store.getters.AllBalance;
				this.History 	= this.$store.getters.History;

				if(this.History.length > 0) {
					this.StatusPay = true;
				} else {
					this.StatusPay = false;
				}

	            object.classList.add('is-active');
	        }, 
	        clickUnderClose (e) {
	            const 	object = document.getElementById('cardChoose');

	            object.classList.remove("is-active");
	        }

		},
        mounted () {
        	initHeightBlock(cards);

			this.$store.watch(() => this.$store.getters.Cards, res => {
				let Cards = res[0].Row;

			 	this.Cards = Cards;
			}, {
			  	immediate: true
			});
        }
	};
</script>