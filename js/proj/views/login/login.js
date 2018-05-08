    // Подключение используемых внутри страницы компонентов
import HeaderComponent from '../layout/header-login.vue';
import SliderNews from '../component/slider-news.vue';
import NavNews from '../component/nav-news.vue';

    // Подключение модулей
import axios from 'axios';
import VModal from 'vue-js-modal';
import device from 'current-device';
import $ from "jquery";

    // Подключение сторонних файлов
import formValidate from '../../common/validateForm';
import placeholderChange from '../../common/placeholderChange';

export default {
    data () {
        return {
                // Открытие первой и блокирование второй форм
            closeFirst: false,
            closeKey: true,

            NumberCard: this.NumberCard,
            NumberKey: this.NumberKey,
            UserName: this.UserName
        };
    },
    mounted () {
            /** 
             * Убираем/возвращаем placeholder
             */
        placeholderChange();

            /** 
             * Выставляем блок с формой на всю страницу
             */
        const   heightAll = wrap.getAttribute('data-height'),
                heightHeader = document.getElementById('headerLogIn').offsetHeight,
                heightSlider = document.getElementById('slider').clientHeight,
                heightLogIn = heightAll - heightHeader - heightSlider;

        logIn.style.cssText=`height: ${heightLogIn}px`;

            /** 
             * Блокируем кнопки в обеих формах по умолчанию
             */
        let buttonLogon = document.getElementById('buttonLogon'),
            buttonConfirm = document.getElementById('buttonConfirm');

        buttonLogon.setAttribute('disabled', 'disabled');
        buttonConfirm.setAttribute('disabled', 'disabled');

            /** 
             * Ставим по дефолту номер и ключ Scratch-карты, 
             * Вставляем по дефолту (или из LocalStorage) logIn
             */
        this.NumberCard = this.$store.getters.NumberCard;
        this.NumberKey = this.$store.getters.NumberKey;
        this.UserName = this.$ls.get('UserName', '');
    },
    methods : {
        updateDataLogon () {
                /** 
                 * Валидация input и изменение placeholder 
                 */
            let UserName = this.$refs.UserName.value,
                Password = this.$refs.Password.value,
                requirement = (UserName.length > 0) && (Password.length > 0);

            formValidate(requirement, buttonLogon);
        },
        updateDataKey() {
            let NumKey = this.$refs.NumKey.value,
                requirement = (NumKey.length === 5);

            formValidate(requirement, buttonConfirm);
        },
        changeForm () {
                // Переключение форм
            this.closeFirst = !this.closeFirst;
            this.closeKey = !this.closeKey;
        },
        resetForm () {
            this.changeForm();
            this.$store.dispatch('resetContext');
        },
        RegistrationUserLogon (submitEvent, repeat) {
            if (repeat === undefined) {
                repeat = false;
            }

            var UserName = this.$refs.UserName.value,
                Password = this.$refs.Password.value,
                c = this.$refs.c.value,
                a = this.$refs.a.value,
                KeyType = 1;
                
            axios.post('/form', {
                typeRequest: "RegistrationUser-Logon",
                UserName: UserName,
                Password: Password,
                c: c,
                a: a,
                KeyType: KeyType
            })
            .then(response => {
                var data = response.data,
                    status = data.status;

                    // В случае удачного запроса, открываем вторую часть авторизации и закрываем первую
                if(status) {
                    var content = data.content,
                        KeyType = content.KeyType,
                        NumCard = content.NumCard,
                        NumKey = Number(content.NumKey),
                        Context = data.Context;

                        // Меняем дефолтное значение номера и кода Scratch-карты
                    this.NumberCard = NumCard;
                    this.NumberKey = NumKey;

                        // Сохраняем Context в vuex
                    this.$store.commit('setAuth', { type: 'Context', items: Context });

                        // Сохраняем UserName в LocalStotage
                    this.$ls.set('UserName', UserName);

                        // Обновляем UserName (при возврате назад)
                    this.UserName = UserName;

                        // Меняем форму если это не повторный запрос на получение ключа
                    if(!repeat) {
                        this.changeForm();
                    }
                } else {
                    this.$modal.show('dialog', this.$store.getters.formErrorLogIn);
                }
            })
            .catch(e => {
                this.$modal.show('dialog', this.$store.getters.formErrorAPP);
            });
        },
        RegistrationUserConfirm (submitEvent) {
            let Context = this.$store.getters.Context,
                UserName = this.$ls.get('UserName', ''),
                KeyValue = this.$refs.NumKey.value,
                KeyType = 1;

            axios.post('/form', {
                typeRequest: "RegistrationUser-Confirm",
                Context: Context,
                UserName: UserName,
                KeyValue: KeyValue,
                KeyType: KeyType
            })
            .then(response => {
                var data = response.data,
                    status = data.status;

                    // В случае удачного запроса, сохраняем Context, изменяем статус авторизации и переходим на главную страницу
                if(status) {
                    let Context = data.Context;

                    this.$store.commit('setAuth', { type: 'Context', items: Context });
                    this.$store.commit('setAuth', { type: 'appStatus', items: true });

                    this.$router.push('/');
                } else {
                    this.$modal.show('dialog', this.$store.getters.formErrorConfirm);

                        // Повторно делаем запрос для нового Context
                    this.RegistrationUserLogon(undefined, true);
                }
            })
            .catch(e => {
                this.$modal.show('dialog', this.$store.getters.formErrorAPP);
            });
        }
    },
	components: { 
        HeaderComponent,
        SliderNews,
        NavNews,
        VModal
    }
};