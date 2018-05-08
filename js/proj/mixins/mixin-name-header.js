import { EventBus } from '../event-bus/event-bus.js';

	// Примесь для задания background страницы и боковых меню
export default {
	mounted () {
            /** 
             * Передаём header информацию о текущей странице
             */
        const 	props = this._props,
        		namePage = props.namePage;

        	// Меняем название страницы в header-main
        EventBus.$emit('name-page-to-header', namePage);
	},
};