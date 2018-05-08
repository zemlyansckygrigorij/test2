<template>
	<div class="header__template">
		<div id="mainMenu" class="main-menu" data-open="0">
			<div class="main-menu__content">
				<div class="main-menu__block">
					<div class="main-menu__heading">Основное меню</div>
					<div class="main-menu__content-menu">
						<div class="main-menu__menu-item m--one" v-on:click="clickToItemMenu('/')">
							<div class="main-menu__menu-text">Главная</div>
						</div>

						<div class="main-menu__menu-item m--two" v-on:click="clickToItemMenu('/cards')">
							<div class="main-menu__menu-text">Карты</div>
						</div>
						
						<div class="main-menu__menu-item m--three">
							<div class="main-menu__menu-text">Счета</div>
						</div>

						<div class="main-menu__menu-item m--four" v-on:click="clickToItemMenu('/payments')">
							<div class="main-menu__menu-text">Платежи</div>
						</div>
						
						<div class="main-menu__menu-item m--five">
							<div class="main-menu__menu-text">Шаблоны</div>
						</div>
					</div>
				</div>
				<div class="main-menu__block">
					<div class="main-menu__heading">Курсы валют</div>
					<div class="main-menu__content-course">
						<table class="main-menu__table">
							<tr class="main-menu__table-heading">
							    <th class="main-menu__cell-heading"></th>
							    <th class="main-menu__cell-heading">usd</th>
							    <th class="main-menu__cell-heading">gbp</th>
							    <th class="main-menu__cell-heading">eur</th>
						   	</tr>
						   	<tr class="main-menu__table-item">
						   		<td class="main-menu__cell">Курс ЦБ</td>
						   		<td class="main-menu__cell">{{ CBUSD }}</td>
						   		<td class="main-menu__cell">{{ CBGBP }}</td>
						   		<td class="main-menu__cell">{{ CBEUR }}</td>
						   	</tr>
						   	<tr class="main-menu__table-item">
						   		<td class="main-menu__cell">Продажа</td>
						   		<td class="main-menu__cell m--active">{{ sellUSD }}</td>
						   		<td class="main-menu__cell m--active">{{ sellGBP }}</td>
						   		<td class="main-menu__cell m--active">{{ sellEUR }}</td>
						   	</tr>
						   	<tr class="main-menu__table-item">
						   		<td class="main-menu__cell">Покупка</td>
						   		<td class="main-menu__cell m--active">{{ buyUSD }}</td>
						   		<td class="main-menu__cell m--active">{{ buyGBP }}</td>
						   		<td class="main-menu__cell m--active">{{ buyEUR }}</td>
						   	</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="main-menu__button">
				<div style="background-position: 0px 0px;" 		class="main-menu__button-block" v-on:click="clickToItemMenu('/message-bank')"></div>
				<div style="background-position: -30px 0px;" 	class="main-menu__button-block" v-on:click="clickToItemMenu('/settings')"></div>
				<div style="background-position: -60px 0px;" 	class="main-menu__button-block"></div>
				<div style="background-position: -90px 0px;" 	class="main-menu__button-block"></div>
				<div style="background-position: -120px 0px;" 	class="main-menu__button-block" v-on:click="clickToLogin"></div>
			</div>
		</div>

	    <div class="header__block m--home">
	    	<div id="hamburger" class="header__image-hamburger" v-on:click="clickOpenMainMenu('swipe')" style="background-image: url('/public/i/svg/menu1.svg');" ></div>

			<div class="header__heading-block">
	        	<img class="header__image" src="/public/i/png/logo_android.png" alt="Логотип Компании" v-if="!namePageStatus">
	        	<span v-else="namePageStatus">{{ namePage }}</span>
			</div>

			<div id="person" class="header__image-person" v-on:click="clickOpenPersonMenu('swipe')" style="background-image: url('/public/i/svg/person3.svg');" ></div>
	    </div>

		<div id="personMenu" class="person-menu" data-open="0">
			<div class="person-menu__person">	
				<div class="person-menu__person-image" v-bind:style="'background-image: url(data:'+ MIME + ';base64,' + Data + ');'"></div>
				<div class="person-menu__person-name">{{ Family }} {{ Name }} {{ Otchestvo }}</div>
			</div>
			<div class="person-menu__information">
				<div class="person-menu__information-item">
					<span class="person-menu__information-text">Последний вход:</span>
					<span class="person-menu__information-text m--bold">{{ IP }}</span>
				</div>
				<div class="person-menu__information-item">
					<span class="person-menu__information-text">IP Последнего входа</span>
					<span class="person-menu__information-text m--bold">{{ TimeLastEnter }}</span>
				</div>
				<div class="person-menu__information-item">
					<span class="person-menu__information-text">Количество бонусных баллов:</span>
					<span class="person-menu__information-text m--bold" v-bind:style="'color:' + BonusColor + ';'">{{ ballBonus }}</span>
					<a class="person-menu__information-link" href="">узнать о бонусной программе</a>
				</div>
			</div>
			<div class="person-menu__document">
				<div class="person-menu__document-heading">документы ЭСП</div>
				<div class="person-menu__document-item m--one">
					<a href="http://www.uralprombank.ru/chastnym-licam/internet-bank/" class="person-menu__document-link">Ознакомьтесь с документами</a>
				</div>
				<div class="person-menu__document-item m--two">
					<a href="" class="person-menu__document-link">Использование персональных данных</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./header-main.js"></script>