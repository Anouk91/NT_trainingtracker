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
          <h2 class="color big"> {{exercises.length}} </h2>
      </div>
    </div>

    <div class="col-sm">
      <div class="card">
          <h3> Top 3 of the week </h3>
        <div v-for="(player,index) in topThreeOfTheWeek()" :key="index" style="display: inline;">
          <div class="flex">
            <div class="color rank"> {{index +1 }} </div>
            <div class="name"> {{player.username}}</div>
            <div> {{player.count}}x</div>
          <!-- </div> -->
        </div>
        
      </div>
    </div>
  </div>



    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      users: [],
      exercises: []
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname'),
      exercises: db.collection('exercises').orderBy('userId')
    }
  },
  methods: {
    topThreeOfTheWeek () {
      const orderedById = [] // [{userId, count}]
      const exercisesThisWeek = this.exercises.filter(e => moment.unix(e.date.seconds).format('w') === moment(new Date()).format('w'))
      // const thisWeekNo = moment(new Date()).format('w')

      // this.exercises.forEach(e => {
      // const exerciseWeekNo = moment.unix(e.date.seconds).format('w')
      //   if (exerciseWeekNo === thisWeekNo) exercisesThisWeek.push(e)
      // })

      exercisesThisWeek.forEach(e => {
        const player = orderedById.find(p => { return e.userId === p.userId })

        if (!player) {
          const playerInfo = this.users.find(u => { return u.email_address === e.userId })
          orderedById.push({ userId: e.userId, username: `${playerInfo.firstname} ${playerInfo.lastname}`, count: 1 })
        } else player.count++
      })
      return orderedById.sort((a, b) => { return b.count - a.count }).splice(0, 3)
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
