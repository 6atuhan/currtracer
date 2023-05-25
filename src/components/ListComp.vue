<template>
    <div class=" w-full flex items-center justify-start flex-col p-1 h-96 overflow-y-scroll overflow-x-hidden border-r border-black">
        <ul >
          <!-- list item area -->
          <li v-show="index >=1 " v-for="(curr,index) in this.$store.state.list" :key="index" :class="{'!bg-fuchsia-300' : editSymbol==curr[0]}" class="flex flex-wrap my-2 flex-row w-full md:w-[500px] items-center justify-between p-2 border rounded-lg border-black/40 hover:bg-[#41b883]/30 transition-all">
            <!-- symbol and lastPrice   area -->
            <div class="basis-full w-full ">
              <p>{{ curr[0] }} <span class="opacity-50"> {{ curr[2] }} $</span> </p>
            </div>
            <!-- amounth times weightedAvgPrice for total  area  -->
            <div class="basis-1/3 w-full">
              <p class="w-32 truncate" >total: {{ curr[1]*curr[2] }} $</p>
            </div>
            <!-- amounth value input area for update -->
            <div class="basis-1/3 w-full flex items-center justify-center">
              <p v-if="!isEdit" class=" outline-none ring-0 p-1 border border-black rounded-lg bg-white text-center w-1/2">{{curr[1]}}</p>
              <input v-if="isEdit && editSymbol == curr[0]" @change="[takeTempAmount($event)]" :value="curr[1]" type="number" min="0" class=" outline-none ring-0 p-1 border border-black rounded-lg bg-white text-center w-1/2">
            </div>
            <!-- func buttons area -->
            <div class="basis-1/3 w-full flex items-center justify-evenly">
              <button v-if="!isEdit" @click="isEdit=true,editSymbol=curr[0]" class="border border-fuchsia-800 hover:text-white rounded-lg bg-fuchsia-400 px-2 hover:bg-fuchsia-500 transition-all" >update</button>
              <button v-if="isEdit" @click="updateCurrencyAmount(curr[0])" class="border border-fuchsia-800 hover:text-white rounded-lg bg-fuchsia-400 px-2 hover:bg-fuchsia-500 transition-all" >updating</button>
              <button v-if="!isEdit" @click="removeCurrency(curr)" class="border border-red-800 hover:text-white rounded-lg bg-red-400 px-2 hover:bg-red-500 transition-all">remove</button>
            </div>
          </li>
        </ul>
    </div>
</template>
<script>
export default{
  name: "ListComp",
  data(){
    return{
      list:this.$store.state.list,
      tempAmount:0,
      editSymbol:"",
      isEdit:false
    }
  },
  methods:{
    removeCurrency(curr){   //remove currency via vuex
      this.$store.dispatch("deleteCurrency",curr)
    },
    takeTempAmount(event){  //get selected curreny amount for update
      this.tempAmount = event.target.value
    },
    updateCurrencyAmount(symbol){   //update currency via vuex
      const newAmount = this.tempAmount
      this.$store.dispatch("updateAmount",{ symbol, newAmount })
      this.editSymbol=""
      this.isEdit=false
    },
  },

  updated(){
    this.list=this.$store.state.list
  },
  mounted(){
    this.list=this.$store.state.list

  }
}
</script>
<style></style>
