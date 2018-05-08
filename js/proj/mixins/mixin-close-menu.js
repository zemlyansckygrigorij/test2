	// Примесь для переключения боковых меню
export default {
    methods: {
        clickUnderOpen (e) {
                /**
                 * 1. Получаем id кнопки, на которую нажали
                 * 2. Далее находим следующий элемент (меню), получаем полную информацию по элементу, достаём его id
                 * 3. Находим его по найденному id
                 */
            let idButton = e.target.id,
                idAccount = document.getElementById(idButton).nextSibling.nextElementSibling.id,
                object = document.getElementById(idAccount);

            object.classList.add('is-active');
        }, 
        clickUnderClose (e) {
            let id = e.target.attributes["0"].value,
                object = document.getElementById(`menu-${id}`);

            object.classList.remove("is-active");
        }
    },
}