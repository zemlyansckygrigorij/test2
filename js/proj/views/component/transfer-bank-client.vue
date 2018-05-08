<template>
	<div class="transfer-bank-client__template">
		<button id="transfer-bank-client" class="transfer-bank-client__button-open" v-on:click="clickUnderOpen"></button>

        <div id="transferBankClient" v-bind:class="'transfer-bank-client__menu is-' + Background">
            <div class="transfer-bank-client__heading-menu">
                <button class="transfer-bank-client__button-close" v-on:click="clickUnderClose"></button>
                <div>Перевод клиенту банка</div>
            </div>
            <div class="transfer-bank-client__content">

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
	            let object = document.getElementById("transferBankClient");

	            object.classList.remove("is-active");
	        }
		},
        mounted () {

        }
	};
</script>