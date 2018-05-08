'use strict';

import $ from "jquery";

const opt = {
	input: '.js-input',
    close: 'is-close'
};

    /** 
     * Убираем/возвращаем placeholder
     */
function placeholderInit() {
    
    function placeholderChange($obj) {
        let $sublings = $obj.next(),
            length = $obj.val().length;

        if(length > 0) {
            $sublings.addClass(opt.close);
        } else {
            $sublings.removeClass(opt.close);
        }
    };

    function placeholderChangeList(status, $obj) {
        if(status) {
            $obj.each(function( i, val ) {
                placeholderChange($(this));
            });
        } else {
            placeholderChange($obj);
        }
    };

    placeholderChangeList(true, $(opt.input));

    $(opt.input).keyup(function() {
        placeholderChangeList(false, $(this));
    });
};

export default placeholderInit;