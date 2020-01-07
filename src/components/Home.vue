<template>
  <div class="container">

  <!-- Teams Stats -->
    <div class="row">

      <div class="col">
        <div class="card">
          <h3> #RoadToLeeuwarden</h3>
          <div class="inline" >
          <h2 class="color big"> {{weeks}}</h2> <p>{{meervoud_week}}</p> 
          <h2 class="color small"> {{days}}</h2> <p>{{meervoud_dag}}</p> <br>
        </div>
        </div>
      </div>
      <total-exercises :exercises="exercises()" > </total-exercises>
      <top3 :exercises="exercises()" :members="members()" :amountOfTop="5"> </top3>
    </div>


  </div>
</template>

<script>
// import { db } from '../firebase'
import Top3 from '../elements/Top3.vue'
import TotalExercises from '../elements/TotalExercises.vue'

export default {
  name: 'home',
  components: {
    Top3,
    TotalExercises
  },
  props: {
    ndt_exercises: {type: Array},
    nmt_exercises: {type: Array},
    not_exercises: {type: Array}
  },
  data () {
    return {
      ndt_members: require(`../../static/NDT.json`),
      nmt_members: require(`../../static/NMT.json`),
      not_members: require(`../../static/NOT.json`),
      countDownDate: new Date('Jul 11, 2020 17:00:00')
    }
  },

  methods: {
    exercises () {
      return this.ndt_exercises.concat(this.nmt_exercises).concat(this.not_exercises)
    },
    members () {
      return this.ndt_members.concat(this.nmt_members).concat(this.not_members)
    },
    countDown (type) {
      const countDownDate = new Date('Jul 11, 2020 17:00:00')
      const today = new Date()
      const distance = countDownDate - today
      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7))
      if (weeks > 0) this.weeks = weeks

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 7
      if (days > 0) this.days = days
      return type === 'week' ? weeks : days
      // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      // var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    },
    totalExercises (team) {
      return team === 'ndt' ? this.ndt_exercises.length
        : team === 'nmt' ? this.nmt_exercises.length
          : team === 'not' ? this.not_exercises.length : this.ndt_exercises.length + this.nmt_exercises.length + this.not_exercises.length
    }
  },
  computed: {
    meervoud_week: function () {
      return this.weeks > 1 ? 'weken' : 'week'
    },
    meervoud_dag: function () {
      return this.days === 1 ? 'dag' : 'dagen'
    },
    weeks: function () {
      const today = new Date()
      const distance = this.countDownDate - today
      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7))
      if (weeks > 0) return weeks
      else return 0
    },
    days: function () {
      const today = new Date()
      const distance = this.countDownDate - today
      const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 7
      if (days > 0) return days
      else return 0
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inline > * {
  display: inline;
}

.color {
  color: #ff6600; 
}

.big {
  font-size: 5rem;
}

.small {
  font-size: 4rem;
}

.text {
  text-align: left;
  color: #ff6600;
}


</style>
