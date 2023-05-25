<template>
    <div>
      <!-- info line  -->
      <h1 class="text-center font-bold basis-full text-green-400">currency not in your portfolio</h1>
        <ul class="w-full px-1 ">
                <li v-if="data != 'Choose a Currency'" class="flex flex-wrap my-2 flex-row w-full  items-center justify-between p-2 border rounded-lg px-10 border-green-800 hover:bg-lime-500/20 transition-all">
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
                  <input v-model="amounth" type="number" min="0" class=" outline-none ring-0 p-1 border border-black rounded-lg bg-white text-center w-24">
                </div>
                <!-- func button area -->
                <div class="basis-1/3 w-full flex items-center justify-evenly">
                  <button @click="addCurrency" class="border border-green-800 rounded-lg bg-green-400 px-2 hover:bg-green-500 w-24 py-1 transition-all">add</button>
                </div>
    
              </li>
            </ul>
    </div>
</template>

<script>
export default{
    name:'AddCurrencyLineComp',
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
        addCurrency(){    //add currency via vuex
          if( this.amounth < 0 ){
            this.amounth = 0
            var tempData = [this.data[0],this.amounth*1,this.data[2],this.data[3]]
            this.$store.dispatch("addCurrency",tempData)
            this.resetFilter()
          }
          else{

            var tempData = [this.data[0],this.amounth*1,this.data[2],this.data[3]]
            this.$store.dispatch("addCurrency",tempData)
            this.resetFilter()
          }
    },
    },
}

</script>