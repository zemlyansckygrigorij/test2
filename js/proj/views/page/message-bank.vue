<template>
	<div class="message-bank">
		<header id="headerMain" class="header">
			<HeaderComponent></HeaderComponent>
		</header>

	  	<div id="messageBank" class="message-bank__cluster page">
		  	<div class="message-bank__content">
		  		<div class="message-bank__heading">Ваше сообщение</div>

				<form name="message-bank" class="form" v-on:submit.prevent="messageBank">
					<div class="form__block m--textarea">
						<textarea name="Question" id="Question" class="form__textarea js-input" ref="Question" cols="30" rows="10" @input="updateDataQuestion()"></textarea>
						<label class="form__label-placeholder m--textarea" for="Question" data-placeholder="Текст сообщения"></label>
					</div>

	                <div class="form__block m--padding">
	                    <button id="buttonMessage" type="submit" class="form__button m--shadow">отправить</button>
	                </div>
				</form>


                <div  id="bannerMessageBankId" >
					<bannerMessageBank></bannerMessageBank>
		  	  	</div>



		  	</div>
	  	</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import HeaderComponent from '../layout/header-main.vue';

	import axios from 'axios';
	import $ from "jquery";

	import mixinСardHeader from '../../mixins/mixin-card-header.js';
	import mixinNameHeader from '../../mixins/mixin-name-header.js';

	import formValidate from '../../common/validateForm';
	import placeholderChange from '../../common/placeholderChange';
	import initHeightBlock from '../../common/initHeightBlock.js';

    import bannerMessageBank from '../component/bannerMessageBank.vue';

	export default {
		mixins: [mixinСardHeader, mixinNameHeader],
		props: ['namePage'],
		data () {
			return {}
		},
		components: { 
			HeaderComponent,
			bannerMessageBank
		},
		methods: {
	        updateDataQuestion () {
	                /** 
	                 * Валидация input и изменение placeholder 
	                 */
	            let Question = this.$refs.Question.value,
	            	requirement = (Question.length > 0);

	            formValidate(requirement, buttonMessage)
	        },
		},
        mounted () {
	        placeholderChange();

        	initHeightBlock(messageBank);
        }
	};
</script>