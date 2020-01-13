<template>
  <div class="col">
    <div class="card dashboard-card">
      <div class="card-body">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Button</button>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
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
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: this.exercisesFormatted
        // [
        //   {
        //     label: 'Data One',
        //     backgroundColor: '#f87979',
        //     data: [this.getRandomInt(), this.getRandomInt()]
        //   },
        //   {
        //     label: 'Data Two',
        //     backgroundColor: '#f87923',
        //     data: [this.getRandomInt(), this.getRandomInt()]
        //   }
        // ]
      }
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    exerciseTypePerWeek (type) {
      var currentWeekNum = moment(new Date()).isoWeekday(1).format('w')
      console.log('curr week num', currentWeekNum)
      var x = [1, 2, 3]
      var y = []
      for (let i = 1; i < 4; i++) {
        var sub = this.exercises.filter(e => (i === Number(moment.unix(e.date.seconds).isoWeekday(1).format('w'))) && (e.type.name === type))
        console.log('sub', i, sub)
        y.push(sub.length)
      }
      var result = { x: x, y: y, mode: 'lines+markers', label: type }
      console.log('sub info', result)
      return y
    }
  },
  computed: {
    exercisesFormatted () {
      var result = []
      if (this.exercises) {
        result.push({label: 'Strength', data: this.exerciseTypePerWeek('Strength')})
        // result.push(this.exerciseTypePerWeek('Team Training'))
        // result.push({label: 'teamTraining', backgroundColor: '#f22279', data: this.exerciseTypePerWeek('TeamTraining')})
      }
      return result
      // }
    }
  }
}
</script>

<style scoped>
.big {
  font-size: 5rem;
}
</style>

