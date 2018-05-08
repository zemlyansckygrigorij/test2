'use strict';

const opt = {
    headerMain: 'headerMain'
};

function initHeightBlock(object) {
    const   heightAll = wrap.getAttribute('data-height'),
            heightHeader = document.getElementById(opt.headerMain).offsetHeight,
            heightMain = heightAll - heightHeader;

    object.style.cssText=`height: ${heightMain}px`;
};

export default initHeightBlock;