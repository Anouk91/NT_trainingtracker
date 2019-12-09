<template>
  <div class="container">

  <div class="row" >
    <div class="col"> 
      <img src="../../static/img/nederland-orange.jpeg" class="d-inline-block align-top lion" alt="Lion" >
      
    </div >
    <div class="col">
      <h2 class="text"> Nederlands Dames Team <br> Training Tracker </h2>
    </div>

  </div>
  <hr>

  <!-- Team Stats -->
  <div class="row">

    <div class="col">
      <div class="card">
        <div style="display: inline; " >
        <h2 class="number big"> {{countDown('week')}}</h2> <p>weeks </p> 
        <h2 class="number small"> {{countDown()}}</h2> <p>days </p> <br>
      </div>
        <h3> #RoadToLeeuwarden</h3>
      </div>
    </div>

    <div class="col">
      <div class="card" >
        <div style="display: inline;">
          <h2 class="number big"> {{exercises.length}} </h2> <p>exercises </p>
          <h3> DONE </h3>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card">
          <!-- <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Exercises done</th>
            </tr>
          </thead> -->
        <div v-for="(player,index) in topThreeOfTheWeek()" :key="index">
          <div class="row">
                <div class="col-1 top3 rank"> {{index +1 }} </div>
                <div class="col top3 name"> {{player.username}}</div>
                <div class="col-2 top3 times"> {{player.count}} x</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  <hr>
    <!-- <datescroller :datelist="dates" /> -->
    <div class="row">
      <div class="col">
        <b-form-select v-model="selected_user" :options="userDropdown()">
          <option :value="null" disabled>-- Selecteer jezelf --</option>
        </b-form-select>
      </div>
      <div class="col">

        <!-- Trigger the modal with a button -->
        <b-button v-on:click="showModal = true" :disabled="!selected_user" variant="primary">
          Add Exercise
        </b-button>

      </div>
      <div class="row">
        <exercise-modal :email_user="selected_user"  v-if="showModal" @close="showModal = false">
        </exercise-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseModal from '../elements/ExerciseModal.vue'
import { db } from '../firebase'

export default {
  name: 'home',
  components: {
    ExerciseModal
  },
  data () {
    return {
      showModal: false,
      users: [],
      exercises: [],
      description_exercise: '',
      selected_user: null
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname'),
      exercises: db.collection('exercises').orderBy('userId')
    }
  },
  methods: {
    userDropdown () {
      var dropdownList = []

      this.users.forEach(user => {
        dropdownList.push({value: user.email_address, text: `${user.firstname} ${user.lastname}`})
      })
      return dropdownList
    },
    topThreeOfTheWeek () {
      var orderedById = [] // [{userId, count}]
      this.exercises.forEach(e => {
        var player = orderedById.find(p => { return e.userId === p.userId })

        if (!player) {
          var playerInfo = this.users.find(u => { return u.email_address === e.userId })
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
<style>
.lion {
  -webkit-clip-path: circle(50% at 50% 50%); 
  clip-path: circle(50% at 50% 50%);
  width: 6rem;
  height: 6rem;
}
.number {
  color: #ff6600; 
  font-style: bold;
  margin: 0;
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

.headerRow {
  margin-bottom: 2rem;
}

.top3 {
  padding: .3rem;
}

.card {
  background-color:#fff0e6;
  margin: 2rem;
  padding: 1rem;
  justify-content: center;
}



h2, p {
  display: inline;
}
</style>
