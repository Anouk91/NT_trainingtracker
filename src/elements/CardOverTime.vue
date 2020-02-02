<template>
  <div class="col">
    <div class="card dashboard-card">
      <div class="card-body">
    <!-- <line-chart ></line-chart> -->
    <line-chart :style="getLineWidth()" :chartData="datacollection" :options="chartOptions"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../helpers/LineChart.js'
import moment from 'moment'

export default {
  name: 'card-over-time',
  props: {
    exercises: { type: Array }
  },
  components: {
    LineChart
  },
  data () {
    return {
      loaded: false,
      maxY: null,
      datacollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      },
      workOutTypes: require(`../../static/workout_types.json`),
      currentWeekNum: Number(moment(new Date()).isoWeekday(1).format('w'))

    }
  },
  created () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = this.exerciseTypePerWeek()
    },
    exerciseTypePerWeek () {
      var result = []
      var yMax = 0
      this.workOutTypes.forEach(workOutType => {
        var y = []
        for (let i = 1; i < this.currentWeekNum + 1; i++) {
          var t = this.exercises.filter(e =>
            (i === Number(moment.unix(e.date.seconds).isoWeekday(1).format('w'))) &&
            (e.type.name === workOutType.name))
          if (t.length > yMax) {
            yMax = t.length
            this.chartOptions.scales.yAxes[0].ticks.max = t.length
          }
          y.push(t.length)
        }
        result.push({ data: y, label: workOutType.name, fill: false, borderColor: workOutType.color })
      })
      this.maxY = yMax
      if (yMax > 5) this.chartOptions.scales.yAxes[0].ticks.max = yMax
      // this.chartOptions.scales.yAxes[0].ticks.max = yMax > 5 ? yMax : 5

      return {
        labels: Array.apply(null, Array(this.currentWeekNum)).map((x, i) => { return `wk${i + 1}` }),
        datasets: result
      }
    },
    getLineWidth () {
      return `width: ${this.currentWeekNum * 100};`
    }
  },
  watch: {
    exercises () {
      this.fillData()
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 0;
  overflow-x: scroll;

}
.line-chart {
    width: 400px;
    /* pointer-events: none; */
}
</style>

