
<template>
    <div class="banner"  v-show="loading"   v-on:dblclick="close">
        <p id = "bannerHeader">
            На главном экране по умолчанию показаны все Ваши счета.                       <br/><br/>
            Контекстные действия для счетов доступны в спойлере, вытягиваемом справа.     <br/><br/>
            Вы можете изменить данные для главного экрана в меню "Настройки". Доступны для показа на главном экране:

            <ul>
                <li>Счета</li>
                <li>Платежи</li>
                <li>Ваши шаблоны</li>
                <li>Новости</li>
            </ul>

        </p>
    </div>
</template>


<script>
import $ from "jquery";
export default {
   
    data() {
        return {
            loading: false
        }
    },
    components: { 
        
    },
     
    methods: {
        close: function(event) {
            this.loading = false;
        }
    },
    mounted() {
        this.loading = this.$store.getters.bannerHomePage.state;
    }
      
};

</script>
<style></style>
