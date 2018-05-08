    // Подключение сторонних скриптов
import device from 'current-device';
import addAttr from './common/addDataAttr';

    // Объявление переменных под компоненты и плагины
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import VueAsyncData from 'vue-async-data';
import AnimatedVue from 'animated-vue';
import VueForm from 'vue-js-modal';

    // Подключение локального хранилища данных vuex
import store from './store';

    // Подключение шины событий для обмена данными между компонентами
import { EventBus } from './event-bus/event-bus.js';

    // Плагин для LocalStorage
import Storage from 'vue-ls';
    
    // Подключение компонентов страниц
import homePage from './views/page/homePage.vue';
import login from './views/login/login.vue';
import settings from './views/page/settings.vue';
import messageBank from './views/page/message-bank.vue';
import cards from './views/page/cards.vue';
import payments from './views/page/payments.vue';

let optionsStorage = {
    namespace: 'vuejs__', 
    name: 'ls', 
    storage: 'local',
};

    // Добавление базовых data- атрибутов
addAttr();

var Vue = require ('./lib/vue.js'),
    VueTouch = require('vue-touch');

    // Регистрация плагинов
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(AsyncComputed);
Vue.use(VueAsyncData);
Vue.use(AnimatedVue);
Vue.use(VueForm, { dialog: true });
Vue.use(Storage, optionsStorage);
Vue.use(VueTouch);

    // Роутинг
var router = new VueRouter({
        /*
        mode: 'history', //removes # (hashtag) from url
        base: '/',
        fallback: true,*/
        routes: [
            { name: 'home'         , path: '/'              , component: homePage  },
            { name: 'login'        , path: '/login'         , component: login     },
            { name: 'payments'     , path: '/payments'      , component: payments    , props: { namePage: "Платежи" }},
            { name: 'cards'        , path: '/cards'         , component: cards       , props: { namePage: "Карты" }},
            { name: 'settings'     , path: '/settings'      , component: settings    , props: { namePage: "Настройки" }  },
            { name: 'message-bank' , path: '/message-bank'  , component: messageBank , props: { namePage: "Сообщение в банк" }  },
            { name: 'all'          , path: '*'              , redirect: '/login'   }
        ]
});
/*
    // Глобальный сторожевой хук, проверяющий, есть ли Context в хранилище Vuex
router.beforeEach((to, from, next) => {
    var appStatus = store.getters.appStatus;

    if ( !appStatus && to.path !== '/login') {
        next('/login');
    }
    else {
        next();
    }
});*/

    /**
     * Создаём главный экземпляр Vue, в котором будет 
     * динамически изменяться контент
     */
new Vue({
    el: '#app',
    router,
    store,
    methods: {
            test (event) {
                console.log(1);
                console.log(event);
            },
        initBackground() {
            var activeDark = this.$ls.get('activeDark', true),
                activeLight = this.$ls.get('activeLight', false);

            if(activeDark) {
                this.changeBackground('dark');
            } else if(activeLight) {
                this.changeBackground('light');
            }
        },
        changeBackground(inf) {
           switch(inf) {
                case 'dark':
                        // Для изменения background блока app
                    app.classList.add("is-dark");
                    app.classList.remove("is-light");
                    break;

                case 'light':
                    app.classList.add("is-light");
                    app.classList.remove("is-dark");
                    break;
            }
        }
    },
    mounted () {
            // Проверка на используемое устройство 
            // Если Desktop - блокируем приложение
        var desktopStatus = device.desktop();

        if(desktopStatus) {
            this.$modal.show('dialog', this.$store.getters.desktopCloseAPP);
            this.$store.dispatch('resetApp');
        }

            // Проверка статуса интернет соединения
        var target = document.getElementById('authStatus'),
            config = { childList: true, characterData: true , subtree: true };

        var internetCloseAPP = () => {
            this.$modal.show('dialog', this.$store.getters.internetCloseAPP);
            this.$store.dispatch('resetApp');
        };

        var internetOpenAPP = () => {
            this.$store.dispatch('runApp');
        };

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var textHTML = mutation.target.textContent;

                if(textHTML === "false") {
                    internetCloseAPP();
                } else if(textHTML === "true") {
                    internetOpenAPP();
                }
            });    
        });             
         
        observer.observe(target, config);

            // Инициализация background
        this.initBackground();

            // Изменение базового background на страницах (работа через шину событий)
        EventBus.$on('change-background', inf => {
            this.changeBackground(inf);
        });
    }
});
    
    // Дополнительные обработчики
window.addEventListener("orientationchange", function() {
    wrap.setAttribute('data-orientation', window.orientation);
}, false);

