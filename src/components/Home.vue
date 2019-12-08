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
  <div class="row">

    <div class="col">
      <h2> {{countDown()}} <br> #RoadToLeeuwarden</h2>
    </div>

    <div class="col">
      <h3> {{exercises.length}} </h3>
      <h3> Total Exercises done </h3>
    </div>

    <div class="col">
      <table class="table">
        <!-- <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Exercises done</th>
          </tr>
        </thead> -->
        <tbody v-for="(player,index) in topThreeOfTheWeek()" :key="index">
          <tr> 
            <td> {{index +1 }} </td>
            <td> {{player.username}}</td>
            <td> {{player.count}} x</td>
          </tr>
        </tbody>
        
      </table>
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
    countDown () {
      const countDownDate = new Date('Jul 11, 2020 17:00:00')
      const today = new Date()
      const distance = countDownDate - today
      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7))
      const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 7
      return `${weeks} weeks and ${days} days to WUGC`
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
.text {
  text-align: left;
  color: orangered;
}

.headerRow {
  margin-bottom: 2rem;
}
</style>
