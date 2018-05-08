'use strict';

import device from 'current-device';

function addAttr() {
	const   deviceTablet = device.tablet(),
	        deviceMobile = device.mobile(),
	        deviceDesktop = device.desktop(),
	        deviceAndroid = device.android(),
	        deviceiOS = device.ios(),
	        orientation =   device.portrait();

	const   sizeOne = window.innerWidth,
	        sizeTwo = window.innerHeight;

	let     width,
	        height;

	if( orientation ) {
	    width = Math.min(sizeOne, sizeTwo),
	    height = Math.max(sizeOne, sizeTwo);
	} else {
	    width = sizeOne,
	    height = sizeTwo;
	}

	wrap.setAttribute('data-width', width);
	wrap.setAttribute('data-height', height);
	wrap.setAttribute('data-orientation-portrait', orientation);

	wrap.setAttribute('data-tablet', deviceTablet);
	wrap.setAttribute('data-mobile', deviceMobile);
	wrap.setAttribute('data-desktop', deviceDesktop);
	wrap.setAttribute('data-android', deviceAndroid);
	wrap.setAttribute('data-ios', deviceiOS);
};

export default addAttr;