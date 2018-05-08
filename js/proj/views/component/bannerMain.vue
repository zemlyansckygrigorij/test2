<template>
<div class="bannerMain"   v-show="loading" v-on:click="close()">
<p id = "bannerHeader">
  
На главном экране по умолчанию показаны все Ваши счета.

<br/>
<br/>
Контекстные действия для счетов доступны в спойлере, вытягиваемом справа.
<br/>
<br/>

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
      loading: true
    };
  },
      components: { 
        
      },
      created: function () {
        
      },
      ready(){
      
   },
   watch: {
      loaded(){
        alert("loaded()");
      }
   },
      methods: {
         updateDataLogon () {    
         }
      },
        mounted () {
       
        },
        close(){
            this.loading = false;
        }
   };

</script>
<style>

</style>
