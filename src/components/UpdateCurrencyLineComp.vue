
<template>
    <div>
      <!-- info line  -->
        <h1 class="text-center font-bold basis-full text-fuchsia-400">currency already in your portfolio</h1>
        <!-- update  area  -->
        <ul class="w-full px-1 ">
                <li v-if="data != 'Choose a Currency'" class="flex flex-wrap my-2 flex-row w-full  items-center justify-between p-2 px-10 border rounded-lg border-fuchsia-800 hover:bg-fuchsia-500/20 transition-all">
                <!-- symbol and lastPrice   area -->
                  <div class="basis-full w-full ">
                  <p>{{ data[0] }} <span class="opacity-50"> {{ data[2]}} $</span> </p>
                </div>
                <!-- amounth times weightedAvgPrice for total  area  -->
                <div class="basis-1/3 w-full">
                  <p class="w-32 truncate" >total: {{ amounth*data[3] }} $</p>
                </div>
                <!-- amounth value input area -->
                <div class="basis-1/3 w-full flex items-center justify-center">
                  <input v-model="amounth" type="number" min="0" class=" outline-none ring-0 p-1 border border-black rounded-lg bg-white text-center  w-24">
                </div>
                <!-- func button area -->
                <div class="basis-1/3 w-full flex items-center justify-evenly">
                  <button @click="updateCurrency" class="border border-fuchsia-800 rounded-lg bg-fuchsia-400 px-2 py-1 hover:bg-fuchsia-500 transition-all  w-24" >update</button>
                </div>    
              </li>
            </ul>
    </div>
</template>

<script>
export default{
    name:'UpdateCurrencyLineComp',
    data(){
        return{
      amounth:1,

        }
    },
    props:{
        data:Array,
        resetFilter:Function

    },
    methods:{
    updateCurrency(){   //check amounth input and update via vuex
      const symbol = this.data[0];
      const newAmount = this.amounth;
        if(newAmount < 0 )
        {
          newAmount =0
          this.$store.dispatch("updateAmount",{ symbol, newAmount })
          this.resetFilter()
        }
        else{
          this.$store.dispatch("updateAmount",{ symbol, newAmount })
          this.resetFilter()

        }
    },
    }
}

</script>