<template>
    <div class="border-b border-black mb-8">
        <ul class="flex items-center justify-start gap-4 px-2 my-2">
            <!-- add and update button -->
            <li>
                <button @click="openAdd"  class="border border-blue-800 bg-blue-300 hover:text-white hover:bg-blue-500 transition-all px-2 py-1 rounded-lg">{{ $store.state.list.length <=1 ? 'Add':'Add / Update' }}</button>
            </li>
            <!-- refresh button -->
            <li>
                <button @click="getBinanceApi" class="border border-blue-800 bg-blue-300 hover:text-white hover:bg-blue-500 transition-all px-2 py-1 rounded-lg">Refresh</button>
            </li>
            <!-- eQuota sign -->
            <li class="ml-auto">
                <sign-comp></sign-comp>
            </li>
        </ul>
    </div>
</template>

<script>
import SignComp from "@/components/SignComp.vue";
export default{
    name:"MenuComp",
    components:{
        SignComp,
    },
    props:{
        getBinanceApi:Function,
        openAdd:Function
    }
}
</script>