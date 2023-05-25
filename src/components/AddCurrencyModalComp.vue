<template>
    <div class="fixed top-0 left-0 bg-cyan-800/50 backdrop-blur-sm z-[9999] w-screen h-screen  flex items-center justify-center">
        <div class="border bg-white border-black min-w-min w-[600px] h-80 rounded-lg p-8 flex flex-wrap items-start justify-center flex-row gap-2 ">
          <!-- CURRENCY SELECTOR   -->
          <select name="currencys" id="currencys" v-model="selected" @change="takeCurrency" class="font-bold text-lg bg-gray-50 border border-gray-300 text-gray-900  rounded-lg ring-0 outline-none   w-10/12 p-2.5">
            <option value="Choose a Currency" disabled>Choose a Currency</option>
            <option v-for="(i,index) in $store.state.binancelist" :key="index" :value="i">{{ i.symbol }}</option>
          </select>
          <!-- close modal button -->
          <button @click="resetFilter" class="border border-red-800 bg-red-400 hover:bg-red-500 rounded-lg w-8 aspect-square text-white text-center select-none transition-all">X</button>
         <!-- add or update line area -->
          <component :is="compName" :data="data" :resetFilter="resetFilter"></component>        
        </div>
    </div>
</template>

<script>
import AddCurrencyLineComp from './AddCurrencyLineComp.vue'
import UpdateCurrencyLineComp from './UpdateCurrencyLineComp.vue'
export default{
  name: "AddCurrencyModalComp",
  components:{
    AddCurrencyLineComp,
    UpdateCurrencyLineComp,
  },
  data() {
    return {
      selected:"Choose a Currency",
      amounth:1,
      data:[],
      compName:""
      // selected:['symbol - str', 'amounth - int', 'lastPrice - int', 'weightedAvgPrice - int'],
    }
  },
  props:{
    closeAdd:Function
  },
  methods: {
    takeCurrency(){   //take currency info on search
      this.data = [this.selected.symbol , this.amounth*1 , this.selected.lastPrice *1, this.selected.weightedAvgPrice *1 ]
      this.searchCurrency(this.data)
    },
    

    resetFilter(){    //reset and close modal
        this.selected = "Choose a Currency"
        this.amounth=0
        this.compName=""
        this.data=[]
        this.closeAdd()

    },
    searchCurrency(sData){    //search currency in list
      var sonuc = this.$store.state.list.filter(item => item[0] ==sData[0]  )
      if(sonuc.length >=1){   //currency exist
        this.compName = "UpdateCurrencyLineComp"
      }
      else{   //currency doesn't exist
        this.compName = "AddCurrencyLineComp"
      }
    }
}
}
</script>