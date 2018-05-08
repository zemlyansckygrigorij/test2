<template>
	<div class="mobile-payment__template">
		<button id="mobile-payment" class="mobile-payment__button-open" v-on:click="clickUnderOpen"></button>

        <div id="mobilePayment" v-bind:class="'mobile-payment__menu is-' + Background">
            <div class="mobile-payment__heading-menu">
                <button class="mobile-payment__button-close" v-on:click="clickUnderClose"></button>
                <div>Мобильные операторы</div>
            </div>
            <div class="mobile-payment__content">
				<div class="mobile-payment__block">
					<div id="beeline" 	class="mobile-payment__init m--beeline" v-on:click="clickMobilePayment"></div>
					<div id="megafon" 	class="mobile-payment__init m--megafon" v-on:click="clickMobilePayment"></div>
					<div id="mts" 		class="mobile-payment__init m--mts" 	v-on:click="clickMobilePayment"></div>
					<div id="tele2" 	class="mobile-payment__init m--tele2" 	v-on:click="clickMobilePayment"></div>
					<div id="rtc" 		class="mobile-payment__init m--rtc" 	v-on:click="clickMobilePayment"></div>
					<div id="other" 	class="mobile-payment__init m--other" 	v-on:click="clickMobilePayment"></div>
				</div>
            </div>
        </div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import mixinBackground from '../../mixins/mixin-background';
	import mixinCloseMenu from '../../mixins/mixin-close-menu';

	export default {
		mixins: [mixinBackground, mixinCloseMenu],
		data () {
			return {
			}
		},
		methods: {
	        clickUnderClose (e) {
	            let object = document.getElementById("mobilePayment");

	            object.classList.remove("is-active");
	        },
	        clickMobilePayment (e) {
	        	var target = e.target,
	        		id = target.id;

	        	switch(id) {
	        		case "beeline": 
	        			console.log("beeline");
	        			break;
	        		case "megafon":
	        			console.log("megafon"); 
	        			break;
	        		case "mts": 
	        			console.log("mts");
	        			break;
	        		case "tele2":
	        			console.log("tele2"); 
	        			break;
	        		case "rtc": 
	        			console.log("rtc");
	        			break;
	        		case "other": 
	        			console.log("other");
	        			break;
	        	}
	        }
		},
        mounted () {

        }
	};
</script>