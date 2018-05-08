<template>
	<div class="random-payment__template">
		<button id="random-payment" class="random-payment__button-open" v-on:click="clickUnderOpen"></button>

        <div id="randomPayment" v-bind:class="'random-payment__menu is-' + Background">
            <div class="random-payment__heading-menu">
                <button class="random-payment__button-close" v-on:click="clickUnderClose"></button>
                <div>Произвольный платеж</div>
            </div>
            <div class="random-payment__content">

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
	            let object = document.getElementById("randomPayment");

	            object.classList.remove("is-active");
	        }
		},
        mounted () {

        }
	};
</script>