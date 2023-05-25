<template>
    <div>
      <!-- chart area -->
        <div v-show="myList.length >1" id="piechart" class="w-full h-96" ></div>
      <!-- info area -->
        <div v-show="myList.length <=1" id="piechart" class="w-full h-96 " >
            <h1 class="text-center text-red-800 text-2xl"> You haven't added any currencies.</h1>
        </div>
    </div>
</template>

<script >

export default{
    name: "ChartComp",
    data(){
        return {
      myList: this.$store.state.list,
    };
    },

    methods: {
        createChart(){    //create chart
          // https://developers.google.com/chart/interactive/docs/gallery/piechart
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
          var veri = this.$store.state.list
      function drawChart() { 
        var data = google.visualization.arrayToDataTable(veri);
        var options = {
          title: 'My Portfolio',
          backgroundColor: "transparent",
          chartArea:{left:0,top:'2.5%',width:'95%',height:'95%'},
          height:"100%",
          legend:{position:"none"},
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);

      }
        },

    },
    watch:{ //draw chart after list updated
      myList(newValue,oldValue){
      this.createChart()
      },
      "$store.state.list"(newList){
      this.createChart()
      }
    },
    created(){
        this.createChart()
    },


}

</script>