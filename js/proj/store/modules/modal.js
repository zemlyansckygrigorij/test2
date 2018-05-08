const state = {
    formErrorLogIn:     {
                            title: 'Ошибка!',
                            text: 'Неверный логин пользователя или пароль',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },
    formErrorConfirm:    {
                            title: 'Ошибка!',
                            text: 'Неправильное значение ключа',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },
    formErrorAPP:       {
                            title: 'Ошибка!',
                            text: 'Система заблокирована, обратитесь в банк, тел. +7 (351) 239-65-65',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },
    desktopCloseAPP:    {
                            title: 'Внимание!',
                            text: 'Вы пользуетесь онлайн банком с пользовательского компьютера, а не со смартфона. Пожалуйста, зайдите в банк через приложение. Приложение, запущенное на ПК будут блокировано!',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },
    internetCloseAPP:    {
                            title: 'Внимание!',
                            text: 'Отсутствует интернет соединение. Подключитесь к мобильной сети или сети Wi-Fi',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },
    requestError:       {
                            title: 'Ошибка!',
                            text: 'Ошибка при получении данных. Повторите операцию позднее',
                            buttons: [
                                {
                                  title: 'Ок'
                                }
                            ]
                        },



    bannerHomePage:     {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },

    bannerLogin:        {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },
    bannerSettings:     {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },


    bannerMessageBank :     {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },

    bannerCards:        {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },
    bannerPayments:     {
                            title: 'Заголовок!',
                            text: 'Здесь должен быть текст',
                        },


};

const getters = {
    formErrorLogIn: (state, getters) => state.formErrorLogIn,
    formErrorConfirm: (state, getters) => state.formErrorConfirm,
    formErrorAPP: (state, getters) => state.formErrorAPP,
    desktopCloseAPP: (state, getters) => state.desktopCloseAPP,
    internetCloseAPP: (state, getters) => state.internetCloseAPP,
    requestError: (state, getters) => state.requestError,

    bannerHomePage: (state, getters) => state.bannerHomePage,
    bannerLogin: (state, getters) => state.bannerLogin,
    bannerSettings: (state, getters) => state.bannerSettings,
    bannerMessageBank: (state, getters) => state.bannerMessageBank,
    bannerCards: (state, getters) => state.bannerCards,
    bannerPayments: (state, getters) => state.bannerPayments,
};

export default {
    state,
    getters
};