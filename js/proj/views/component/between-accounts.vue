<template>
	<div class="between-accounts__template">
		<button id="between-accounts" class="between-accounts__button-open" v-on:click="clickUnderOpen"></button>

        <div id="betweenAccounts" v-bind:class="'between-accounts__menu is-' + Background">
            <div class="between-accounts__heading-menu">
                <button class="between-accounts__button-close" v-on:click="clickUnderClose"></button>
                <div>Между своими счетами</div>
            </div>
            <div class="between-accounts__content">

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
	            let object = document.getElementById("betweenAccounts");

	            object.classList.remove("is-active");
	        }
		},
        mounted () {

        }
	};
</script>