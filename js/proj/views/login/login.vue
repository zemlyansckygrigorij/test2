<template>
	<div class="logIn">
		<header id="headerLogIn" class="header m--logIn">
			<HeaderComponent></HeaderComponent>
		</header>

        <div id="logIn" class="logIn__block">
            <div class="logIn__firstLogIn" v-bind:class="{ 'is-close' : closeFirst }">
                <form name="login" class="form" v-on:submit.prevent="RegistrationUserLogon">
                    <input id="4c43" type="hidden" ref="c" value="095b4831">
                    <input id="a7ad" type="hidden" ref="a" value="2b5203439459">
                    
                    <div class="form__block m--input m--login">
                        <input id="UserName" class="form__input js-input" type="text" ref="UserName" v-bind:value="UserName" @input="updateDataLogon()">
                        <label class="form__label-placeholder" for="UserName" data-placeholder="Логин"></label>
                    </div>
                    <div class="form__block m--input m--password">
                        <input id="Password" class="form__input js-input" type="password" ref="Password" @input="updateDataLogon()">
                        <label class="form__label-placeholder" for="Password" data-placeholder="Пароль"></label>
                    </div>
                    <div class="form__block">
                        <button id="buttonLogon" type="submit" class="form__button m--shadow">войти</button>
                    </div>
                </form>
            </div>
            
            <div class="logIn__key" v-bind:class="{ 'is-close' : closeKey }">
                <div class="logIn__heading">Введите ключ</div>

                <form name="key" class="form m--top" v-on:submit.prevent="RegistrationUserConfirm">
                    
                    <div class="form__block">
                        <div class="form__text-input">Карта №{{NumberCard}}</div>
                    </div>

                    <div class="form__block m--input m--code" v-bind:data-key="'№ ' + NumberKey">
                        <input id="NumKey" class="form__input js-input m--code" type="password" ref="NumKey" @input="updateDataKey()">
                        <label class="form__label-placeholder m--code" for="NumKey" data-placeholder="12345"></label>
                    </div>

                    <div class="form__block m--two-button">
                        <div class="form__button is-active m--left-button" v-on:click="resetForm">Назад</div>
                        <button type="submit" id="buttonConfirm" class="form__button m--right-button">Ввести</button>
                    </div>

                    <div class="form__block">
                        <div id="buttonType" class="form__button m--shadow is-active">Другой тип ключа</div>
                    </div>
                </form>
            </div>
        </div>
        
        <div id="slider" class="news-slider">
            <div class="news-slider__content">
                <SliderNews></SliderNews>
            </div>
        </div>
        
        <div class="nav-news">
            <NavNews></NavNews> 
        </div>

        <v-dialog :width="280" :adaptive="true"/>

        
        <div id="bannerLoginId">
            <bannerLogin></bannerLogin>
        </div>
	</div>
</template>

<script src="./login.js"></script>