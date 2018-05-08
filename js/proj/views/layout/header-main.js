import { EventBus } from '../../event-bus/event-bus.js';

	/*!
	 		\todo Переписать появление боковых меню на vue.js с использованием :if
	 */
import $ from "jquery";
import axios from 'axios';

function shadowOpenClose(object) {
	var $menu = $(`#${object}`),
		statusShadow = $menu.data("open");

	if(!statusShadow) {
        $(".page").append(`<div class='shadow' data-menu='#${object}'></div>`);
        $(".shadow").fadeIn(1000);
        $menu.addClass('is-active');
        $menu.data("open", 1);
	}

	$(".shadow").click(function() {
		var $object = $(this), 
			dataMenu = $object.data('menu'),
			$menuClose = $(`${dataMenu}`);

		if($menuClose.data("open")) {
			$(this).fadeOut(function(){$(this).remove()});
        	$menuClose.removeClass('is-active');
			$menuClose.data("open", 0);
		}
	})
};

function routerMenuClose() {
    var $menuClose = $("#mainMenu");

    $(".shadow").fadeOut(function(){$(".shadow").remove()});
    $menuClose.removeClass('is-active');
    $menuClose.data("open", 0);
};

export default {
	data () {
        this.namePageStatus = false;
        this.namePage = "Тест";

        return {
            IP: this.IP,
            TimeLastEnter: this.TimeLastEnter,

            Data: this.Data,
            MIME: this.MIME,

           	ballBonus: this.ballBonus,
            BonusColor: this.BonusColor,

            Name: this.Name,
            Family: this.Family,
           	Otchestvo: this.Otchestvo,

            CBUSD: this.CBUSD,
            sellUSD: this.sellUSD,
            buyUSD: this.buyUSD,

           	CBGBP: this.CBGBP,
            sellGBP: this.sellGBP,
            buyGBP: this.buyGBP,

            CBEUR: this.CBEUR,
            sellEUR: this.sellEUR,
            buyEUR: this.buyEUR,

            namePageStatus: this.namePageStatus,
            namePage: this.namePage,


        };
    },
    mounted () {
        EventBus.$on('name-page-to-header', inf => {
            (inf) ? this.changeNamePage(inf) : console.log('error-header-main');
        }); 

        EventBus.$on('swipe-header-right', inf => {
            this.clickOpenMainMenu();
        });   

        EventBus.$on('swipe-header-left', inf => {
            this.clickOpenPersonMenu();
        });  

        this.IP = this.$store.getters.IP;
        this.TimeLastEnter = this.$store.getters.TimeLastEnter;

        this.Data = this.$store.getters.Data;
        this.MIME = this.$store.getters.MIME;

        this.ballBonus = this.$store.getters.ballBonus;
        this.BonusColor = this.$store.getters.BonusColor;

        this.Name = this.$store.getters.Name;
        this.Family = this.$store.getters.Family;
        this.Otchestvo = this.$store.getters.Otchestvo;

        this.CBUSD = this.$store.getters.CBUSD;
        this.sellUSD = this.$store.getters.sellUSD;
        this.buyUSD = this.$store.getters.buyUSD;

        this.CBGBP = this.$store.getters.CBGBP;
        this.sellGBP = this.$store.getters.sellGBP;
        this.buyGBP = this.$store.getters.buyGBP;

        this.CBEUR = this.$store.getters.CBEUR;
        this.sellEUR = this.$store.getters.sellEUR;
        this.buyEUR = this.$store.getters.buyEUR;

        this._getHeaderMain();
            EventBus.$emit('test', true);

 
    },
	methods: {
        changeNamePage (namePage) {
            this.namePageStatus = true;
            this.namePage = namePage;
        },
		clickOpenMainMenu () {
            shadowOpenClose("mainMenu");
        },
		clickOpenPersonMenu () {
            shadowOpenClose("personMenu");
        },
        clickToItemMenu (router) {
            routerMenuClose();
            this.$router.push(router);
        },
        clickToLogin () {
        	this.$store.commit('setAuth', { type: 'appStatus', items: false });
            this.$router.push('/login');
        },
        _getHeaderMain () {
            const   UserName = this.$ls.get('UserName', ''),
                    Context = this.$store.getters.Context;

            axios.post('/form', {
                typeRequest: "MenuClient",
                UserName: UserName,
                Context: Context,
            })
            .then(response => {
                var data = response.data,
                    status = data.status;

                console.log(data);

                if(status) {
                    let Context = data.Context,
                    	AuthorizationInfo = data.AuthorizationInfo,
                    	Avatar = data.Avatar,
                    	BonusInfo = data.BonusInfo,
                    	PersonalInfo = data.PersonalInfo,
                    	CourseInfo = data.CourseInfo,
                    	USD = CourseInfo[0].$,
                    	GBP = CourseInfo[1].$,
                    	EUR = CourseInfo[2].$;

                    this.$store.commit('setAuth', { type: 'Context', items: Context });

                    this.IP = AuthorizationInfo.IP;
                    this.TimeLastEnter = AuthorizationInfo.TimeLastEnter;
                    this.Data = Avatar.Data;
                    this.MIME = Avatar.MIME;
                    this.BonusColor = BonusInfo.BonusColor;
                    this.ballBonus = BonusInfo.ballBonus;
                    this.Name = PersonalInfo.Name;
                    this.Family = PersonalInfo.Family;
                    this.Otchestvo = PersonalInfo.Otchestvo;

                    this.CBUSD = USD.CBCource;
                    this.sellUSD = USD.CourseSell;
                    this.buyUSD = USD.CourseBuy;

                    this.CBGBP = GBP.CBCource;
                    this.sellGBP = GBP.CourseSell;
                    this.buyGBP = GBP.CourseBuy;

                    this.CBEUR = EUR.CBCource;
                    this.sellEUR = EUR.CourseSell;
                    this.buyEUR = EUR.CourseBuy;

                    EventBus.$emit('header-main-get', true);

                } else {
                    this.$modal.show('dialog', this.$store.getters.requestError);
                }
            })
            .catch(e => {
                this.$modal.show('dialog', this.$store.getters.formErrorAPP);
            });
        }
	}
};