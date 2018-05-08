	// Базовый миксин для свайпа боковых меню
import $ from "jquery";
import { swipe } from 'jquery-touchswipe';

import { EventBus } from '../event-bus/event-bus.js';

export default {
	mounted () {
		this.swipeLeftStatus = false;
		this.swipeRightStatus = false;

		var statusSwipe = (inf) => {
			var status = false;

			switch(inf) {
				case 'left': 
					(this.swipeLeftStatus) ? (status = false) : (status = true);
				break;

				case 'right': 
					(this.swipeRightStatus) ? (status = false) : (status = true);
				break;
			}

			return status;
		};

		var changeStatus = (inf) => {
			switch(inf) {
				case 'left': 
					this.swipeLeftStatus = true;
				break;

				case 'right': 
					this.swipeRightStatus = true;
				break;
			}
		};

	    $(".page").swipe({
	      	swipeLeft:function(event, direction, distance, duration, fingerCount) {
	      		var status = statusSwipe('left');

	      		if(status) {
	      			EventBus.$emit('swipe-header-left', true);
	      			changeStatus('left');
	      		}

	      	},
	      	swipeRight:function(event, direction, distance, duration, fingerCount) {
	      		var status = statusSwipe('right');

	      		if(status) {
	      			EventBus.$emit('swipe-header-right', true);
	      			changeStatus('right');
	      		}
	      	}
	    });	
	},
};