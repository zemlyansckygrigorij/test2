<template>
	<div class="settings">
		<header id="headerMain" class="header">
			<HeaderComponent></HeaderComponent>
		</header>

	  	<div id="settings" class="settings__cluster page">
	  		<div class="settings__content" id="stage">
				<div class="settings__block">
					<div class="settings__heading">Всплывающие подсказки</div>
					<div class="settings__content-block">
						<div class="settings__text">
							Вы можете просмотреть всплывающие подсказки заново в любой момент, сбросив режим обучения.
						</div>
						<div class="settings__learning-block">
							<button class="settings__button-learning">Сбросить режим обучения</button>
						</div>
					</div>
				</div>

				<div class="settings__block">
					<div class="settings__heading">Фоновое изображение</div>
					<div class="settings__content-block">
						<div class="settings__text">
							Выберите картинку, которая будет использоваться в качестве фона на всех экранах приложения.
						</div>
						<div class="settings__choose-block">
							<div class="settings__background-choose">
								<button class="settings__button-choose" v-bind:class="{ 'is-active' : activeDark }" v-on:click="changeBackground('dark')">Тёмный фон</button>
							</div>
							<div class="settings__background-choose" >
								<button class="settings__button-choose" v-bind:class="{ 'is-active' : activeLight }" v-on:click="changeBackground('light')">Светлый фон</button>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import HeaderComponent from '../layout/header-main.vue';

	import axios from 'axios';

	import mixinNameHeader from '../../mixins/mixin-name-header.js';
	import mixinSwipeBase from '../../mixins/mixin-swipe-base.js';

	import initHeightBlock from '../../common/initHeightBlock.js';

	export default {
		mixins: [mixinNameHeader, mixinSwipeBase],
		props: ['namePage'],
		data () {
			return {
				activeDark: this.activeDark,
				activeLight: this.activeLight
			}
		},
		components: { 
			HeaderComponent,
		},
		methods: {
			changeBackground (typeBackground) {
				switch(typeBackground) {
					case 'dark':
								// Изменяем значение в LocalStorage для главной страницы
							this.$ls.set('activeDark', true);
							this.$ls.set('activeLight', false);

								// Изменяем значение в LocalStorage для боковых меню
							this.$ls.set('activeBackground', 'dark');

								// Переключаем выбранный background в интерфейсе страницы
							this.activeDark = true;
							this.activeLight = false;

								// Передаём данные в main.js , чтобы переключить background
							EventBus.$emit('change-background', 'dark');
						break;

					case 'light':
							this.$ls.set('activeDark', false);
							this.$ls.set('activeLight', true);

							this.$ls.set('activeBackground', 'light');

							this.activeDark = false;
							this.activeLight = true;

							EventBus.$emit('change-background', 'light');
						break;
				}
			}
		},
        mounted () {
        	initHeightBlock(settings);

			this.activeDark = this.$ls.get('activeDark', true);
			this.activeLight = this.$ls.get('activeLight', false);
        },
	};
</script>