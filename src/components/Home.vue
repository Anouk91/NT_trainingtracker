<template>
  <div class="container">

  <!-- <div class="row" >
    <div class="col"> 
      <img src="../../static/img/nederland-orange.jpeg" class="d-inline-block align-top lion" alt="Lion" >
      
    </div >
    <div class="col">
      <h2 class="text"> Nederlands Dames Team <br> Training Tracker </h2>
    </div>

  </div>
  
  <hr> -->

  <!-- Team Stats -->
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

      <div class="col">
        <div class="card" >
            <h3> Total Excersises</h3>
            <h2 class="color big"> {{totalExercises()}} </h2>
        </div>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-sm" v-for="team in teams" :key="team.index">
          <div class="card">
            <h3> Top 3 of the week </h3>
            <div v-for="(player,i) in topThreeOfTheWeek(team.short_name)" :key="i" style="display: inline;">
              <div class="flex">
                <div class="color rank"> {{i +1 }} </div>
                <div class="name"> {{player.username}}</div>
                <div> {{player.count}}x</div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm" v-for="team in teams" :key="team.index">
          <div class="card">
            <h3> Total Excersises {{team.name.split(' ')[1]}}</h3>
            <h2 class="color big"> {{totalExercises(team.short_name)}} </h2>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import { db } from '../firebase'
import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      exercises: [],
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
    topThreeOfTheWeek (team) {
      const orderedById = [] // [{userId, count}]
      var exerciseList = team === 'ndt' ? this.ndt_exercises : (team === 'nmt' ? this.nmt_exercises : this.not_exercises)
      var membersList = team === 'ndt' ? this.ndt_members : (team === 'nmt' ? this.nmt_members : this.not_members)
      console.log(exerciseList)
      if ((exerciseList.length !== 0) && membersList.length !== 0) {
        const exercisesThisWeek = exerciseList.filter(e => moment.unix(e.date.seconds).format('w') === moment(new Date()).format('w'))

        exercisesThisWeek.forEach(e => {
          const player = orderedById.find(p => { return e.userId === p.userId })

          if (!player) {
            const playerInfo = membersList.find(m => { return m.email_address === e.userId })
            orderedById.push({ userId: e.userId, username: `${playerInfo.firstname} ${playerInfo.lastname}`, count: 1 })
          } else player.count++
        })
        return orderedById.sort((a, b) => { return b.count - a.count }).splice(0, 3)
      }
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
      db.collection('ndt_members').get().then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        console.log(documents)
      // do something with documents
      })
      return team === 'ndt' ? this.ndt_exercises.length
        : team === 'nmt' ? this.nmt_exercises.length
          : team === 'not' ? this.not_exercises.length : this.ndt_exercises.length + this.nmt_exercises.length + this.not_exercises.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lion {
  -webkit-clip-path: circle(50% at 50% 50%); 
  clip-path: circle(50% at 50% 50%);
  width: 6rem;
  height: 6rem;
}
.inline > * {
  display: inline;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.rank {
  font-size: 2rem;
  text-align: left;
}
.text {
  text-align: left;
  color: #ff6600;
}

.headerRow {
  margin-bottom: 2rem;
}

.card {
  background-color:#fff0e6;
  margin-bottom: 2rem;
  padding: 1rem;
  justify-content: center;
  
}


</style>
