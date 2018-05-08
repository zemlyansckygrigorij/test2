'use strict';

const opt = {
	active: 'is-active'
};

function ButtonOpen(button) {
    button.classList.add(opt.active);
    button.removeAttribute('disabled');
};

function ButtonClose(button) {
    button.classList.remove(opt.active);
    button.setAttribute('disabled', 'disabled');
};

/**
 * Универсальная валидация форм
 *	- requirement: передаваемое условие открытия/закрытия кнопки
 *	- button: элемент документа с инф. о кнопке
 */
function formValidate(requirement, button) {
    if( requirement ) {
        ButtonOpen(button);
    } else {
        ButtonClose(button);
    }
};

export default formValidate;