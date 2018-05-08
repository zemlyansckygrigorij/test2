<template>
<div class="preloader" v-show="loading" >

   <img src = "public/i/png/logo@2x.png" class="preloadImage">
</div>
</template>





<script>
import $ from "jquery";
export default {
    data() {
    return {
      loading: true,
    };
  },
      components: { 
        
      },
      created: function () {
  
          setTimeout(() => {
                this.loading = false;
      }, 6000);
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
       // alert("  mounted");
        },
   };

</script>
<style>

</style>
//https://medium.com/vuejs-tips/v-cloak-45a05da28dc4
//v-show="loading"