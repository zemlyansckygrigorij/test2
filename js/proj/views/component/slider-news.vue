<template>
    <!--Инициализация slick с передачей опций-->
    <slick ref="slick" :options="slickOptions">
            <!--Цикл -->
        <div class="news-slider__content-block js-news" v-for="(item, index) of news" :key="item.id" v-if="(index+1) <= limitationList" @reInit="reInit">
            <div class="news-slider__content-text" v-html="item.content">
                
            </div>
        </div>
    </slick>

</template>

<script>
        // Плагин для AJAX запросов
    import Slick from 'vue-slick';

    export default {
        components: { Slick },
        data () {
            return {
                limitationList: 5,
                slickOptions: {
                    slidesToShow: 1,
                    infinite: true,
                    speed: 700,
                    arrows: false,
                    dots: true,
                    customPaging : function(slider, i) {
                        return '<button></button>';
                    }
                }
            };
        },
        methods: {
            next () {
                this.$refs.slick.next();
            },

            prev () {
                this.$refs.slick.prev();
            },
            reInit () {
                let currIndex = this.$refs.slick.currentSlide()
                this.$refs.slick.destroy()
                this.$nextTick(() => {
                    this.$refs.slick.create()
                    this.$refs.slick.goTo(currIndex, true)
                })
            }
        }, 
        mounted () {
            this.$store.dispatch('news').then(response => {
                this.news = this.$store.getters.news;                
            });
        },
        asyncComputed: {
            news () {
                return this.$store.getters.news;
            }
        },
        watch: {
            news: function(newNews) {
                this.reInit();
            }
        }
    }
</script>