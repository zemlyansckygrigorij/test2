<template>
	<div class="system-city__template">
		<button id="system-city" class="system-city__button-open" v-on:click="clickUnderOpen"></button>

        <div id="systemCity" v-bind:class="'system-city__menu is-' + Background">
            <div class="system-city__heading-menu">
                <button class="system-city__button-close" v-on:click="clickUnderClose"></button>
                <div>Система «Город»</div>
            </div>
            <div class="system-city__content">

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
	            let object = document.getElementById("systemCity");

	            object.classList.remove("is-active");
	        }
		},
        mounted () {

        }
	};
</script>