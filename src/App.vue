<template>
  <div id="app" class="selection:bg-[#41b883] selection:text-[#35495e] bg-zinc-100 h-screen w-full ">
    
    <header-comp></header-comp>
    <!-- server status -->
    <h3 class="select-none text-xs opacity-70 text-end m-2">servers: <strong :class="{'text-red-400':serverStatus=='offline', 'text-green-700':serverStatus=='online'}">{{ serverStatus }}</strong> </h3>
    
    <div class="container  mx-auto flex flex-wrap flex-col-reverse md:flex-row items-start justify-center">
      <menu-comp class="w-full order-4 md:order-1 basis-full" :getBinanceApi="getBinanceApi" :openAdd="openAdd"></menu-comp>
      <add-currency-modal-comp v-if="openAddModal" :closeAdd="closeAdd" class="w-full basis-full"></add-currency-modal-comp>
      <list-comp class="basis-1/2 w-full order-2 md:order-2"></list-comp>
      <chart-comp class="basis-1/2 w-full order-3 md:order-3"></chart-comp>
    </div>
  </div>
</template>

<script>
import AddCurrencyModalComp from '@/components/AddCurrencyModalComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import ListComp from '@/components/ListComp.vue';
import ChartComp from '@/components/ChartComp.vue';
import MenuComp from '@/components/MenuComp.vue';

import axios from 'axios';


export default {
  name: "App",
  components: {
    HeaderComp,
    ListComp,
    ChartComp,
    AddCurrencyModalComp,
    MenuComp,
  },
  data() {
    return {
      openAddModal:false,
      selected:null,
      amounth:0,
      tempCurrency:null,
      serverStatus:"checking"
      // tempCurrency:['symbol - str', 'amounth - int', 'lastPrice - int', 'weightedAvgPrice - int'],
    }
  },
  methods: {

    getBinanceApi(){    // get currency info s from binance
      this.serverStatus="checking"
      var link ="https://api2.binance.com/api/v3/ticker/24hr"
      axios.get(link).then((response)=>{
        this.$store.state.binancelist = response.data
        this.serverStatus="online"
      }).catch(error=>{
        this.serverStatus="error"
      })
    },

    openAdd(){    //open add modal
      this.openAddModal=true
    },
    closeAdd(){   //close add modal
      this.openAddModal=false
    }

    },
    mounted() {
      //get info s from binance on mounted
      this.getBinanceApi()

      const intervalValue =( 1000 * 60 * 20)
      // refresh info from binance each 20 min.
      setInterval(() => {
      this.getBinanceApi()
      }, intervalValue);
    },

 
};


</script>

<style>
/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #41b883 transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #41b883;
    border-radius: 10px;
    border: 0px none #db0000;
  }
</style>
