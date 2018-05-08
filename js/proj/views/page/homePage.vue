<template>
	<div class="homePage">
		<header id="headerMain" class="header">
			<HeaderComponent></HeaderComponent>
		</header>

	  	<div id="homePage" class="homePage__cluster page">
	  		<div class="homePage__content">
		  	  	<div class="account">
					<account></account>
		  	  	</div>
		  	  	
		  	  	 <div id="preloader" >
					<preloader></preloader>
		  	  	</div>
		  	  	
                <div id="preloaderCircle" v-show="loadingCircle">
					<preloaderCircle></preloaderCircle>
		  	  	</div>


		  	  	<div id="bannerMain" v-show="loadingBannerMain">
					<bannerMain></bannerMain>
		  	  	</div>
		  	 
	  		</div>
	  	</div>
	</div>
</template>

<script>
	import { EventBus } from '../../event-bus/event-bus.js';

	import HeaderComponent from '../layout/header-main.vue';
	import account from '../component/account.vue';
    import preloader from '../component/preloader.vue';
    import preloaderCircle from '../component/preloaderCircle.vue';
    import bannerMain from '../component/bannerMain.vue';
	import axios from 'axios';
    
	import initHeightBlock from '../../common/initHeightBlock.js';

	export default {
		data () {
			return {
				status: this.status,
				loadingCircle: this.loadingCircle,
				loadingBannerMain: this.loadingBannerMain

			}
		},
		created: function () {
			EventBus.$on('test', inf => {
				(inf) ? (console.log("test")) : (console.log("error"));
			});

		},
		components: { 
			HeaderComponent,
			account,
			preloader,
			preloaderCircle,
			bannerMain 
		},
		created: function () {
			EventBus.$on('header-main-get', inf => {
			  	if(inf) {
			  	    this.updateDataLogon();
			  	    this.loadingCircle = true;
			  	} else {
			  	    console.log('error-header-main');	
			  	}
			});

/*	EventBus.$on('test', inf => {
			  	if(inf) {
			  	    setTimeout(() => {
                  this.loadingCircle = true;
      }, 16000);
			  	    
			  	} else {
			  	    console.log('error-header-main');	
			  	}
			});

	*/
	     this.loadingBannerMain = true;//test

		},
		methods: {
			updateDataLogon () {
	            const 	UserName = this.$ls.get('UserName', ''),
	            		Context = this.$store.getters.Context;

		        axios.post('/form', {
		            typeRequest: "MainScreen",
		            UserName: UserName,
		            Context: Context,
		        })
		        .then(response => {
		            var data = response.data,
		                status = data.status;

		            console.log(data);

		            if(status) {
	                    let Context = data.Context,
	                    	CardAccounts = data.CardAccounts,
	                    	CurrentAccounts = data.CurrentAccounts,
	                    	DepositAccounts = data.DepositAccounts; 

	                    this.$store.commit('setAuth', { type: 'Context', items: Context });

	                    this.$store.commit('setAccounts', { type: 'CardAccounts', items: CardAccounts });
	                    this.$store.commit('setAccounts', { type: 'CurrentAccounts', items: CurrentAccounts });
	                    this.$store.commit('setAccounts', { type: 'DepositAccounts', items: DepositAccounts });

		            } else {
		                this.$modal.show('dialog', this.$store.getters.requestError);
		            }
		        })
		        .catch(e => {
		            this.$modal.show('dialog', this.$store.getters.formErrorAPP);
		        });
			},
	

		},
        mounted () {
        	initHeightBlock(homePage);
        	this.status = true;
            this.loadingCircle = false;

        /*EventBus.$on('test-events', inf => {
            console.log(123456);
        });*/

            setTimeout(() => {
                  this.loadingCircle = false;
      }, 26000);
        	
        },
	};
</script>




//token 63f9b7f803d733eafdcd21ca323a589d7e21f62d