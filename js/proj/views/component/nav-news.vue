<template>
    <div class="nav-news__template">
        <div class="nav-news__menu" v-bind:class="allNewsBackground">
            <div class="nav-news__heading">
                <button class="nav-news__button-close" v-on:click="clickAllNews"></button>
                <div>Новости</div>
            </div>
            <div class="nav-news__content">
                <div class="nav-news__block" v-for="(item, index) of news">
                    <div class="nav-news__block-content">
                        <div class="nav-news__block-text" v-html="item.content"></div>
                    </div>
                    <button class="nav-news__button-open" v-on:click="clickUnderOpen" v-bind:id="'button-' + index"></button>
                    
                    <div class="nav-news__menu" v-bind:id="'menu-' + index" v-bind:class="newsMenu">
                        <div class="nav-news__heading">
                            <button class="nav-news__button-close" v-bind:data-id="index" v-on:click="clickUnderClose"></button>
                            <div>Новость</div>
                        </div>
                        <div class="nav-news__content">
                            <div class="nav-news__block-text m--under" v-html="item.content"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <button class="nav-news__all-news" v-on:click="clickAllNews" v-bind:class="active">Новости</button>
    </div>
</template>

<script>
    import mixinBackground from '../../mixins/mixin-background';
    import mixinCloseMenu from '../../mixins/mixin-close-menu.js';

    export default {
        mixins: [mixinBackground, mixinCloseMenu],
        mounted () {
            this.activeNavNews = false;
            
            this.$store.dispatch('news').then(response => {
                this.news = this.$store.getters.news;                
            });
        },
        data () {
            return {
                activeNavNews: this.activeNavNews
            }
        },
        methods: {
            clickAllNews () {
                this.activeNavNews = !this.activeNavNews;
            },
        },
        asyncComputed: {
            news () {
                return this.$store.getters.news;
            },
            allNewsBackground: function () {
                return {
                    'is-active': this.activeNavNews,
                    'is-dark': (this.Background == 'dark'),
                    'is-light': (this.Background == 'light')
                }
            },
            active: function () {
                return {
                    'is-active': this.activeNavNews
                }
            },
            newsMenu: function () {
                return {'is-light' : (this.Background == 'light'), 'is-dark' : (this.Background == 'dark')}
            }
        },
    }
</script>