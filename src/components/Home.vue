<template>
  <div class="container">

  <!-- Teams Stats -->
    <div class="row">

      <div class="col">
        <div class="card">
          <h3> #RoadToLeeuwarden</h3>
          <div class="inline" >
          <h2 class="color big"> {{countDown('week')}}</h2> <p>weeks </p> 
          <h2 class="color small"> {{countDown()}}</h2> <p>days </p> <br>
        </div>
        </div>
      </div>
      <total-exercises :exercises="exercises()" > </total-exercises>
      <top3 :exercises="exercises()" :members="members()"> </top3>
    </div>


  </div>
</template>

<script>
import { db } from '../firebase'
import Top3 from '../elements/Top3.vue'
import TotalExercises from '../elements/TotalExercises.vue'

export default {
  name: 'home',
  components: {
    Top3,
    TotalExercises
  },
  data () {
    return {
      ndt_members: [],
      nmt_members: [],
      not_members: [],
      ndt_exercises: [],
      nmt_exercises: [],
      not_exercises: [],
      teams: []
    }
  },
  firestore () {
    return {
      ndt_members: db.collection('ndt_members').orderBy('firstname'),
      nmt_members: db.collection('nmt_members').orderBy('firstname'),
      not_members: db.collection('not_members').orderBy('firstname'),
      ndt_exercises: db.collection('ndt_exercises'),
      nmt_exercises: db.collection('nmt_exercises'),
      not_exercises: db.collection('not_exercises'),
      teams: db.collection('team')
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
      const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 7
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

.card {
  background-color:#fff0e6;
  padding: 1rem;
  justify-content: center;
}


</style>
