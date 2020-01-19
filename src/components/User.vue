<template>
  <div class="container">

    <!-- Select user row -->
    <div class="row user-login">

      <div class="col">
        <b-form-select v-model="selectedUser" :options="dropDown()" :key="selectedTeam">
            <option :value="null" disabled>-- Selecteer jezelf --</option>
        </b-form-select>
      </div>
      <b-button v-if="!userLoggedIn" v-on:click="showLoginModal = true" :disabled="!selectedUser" variant="primary"> login </b-button>
      <b-button v-if="userLoggedIn" v-on:click="logOut()" variant="warning"> logout </b-button>
    </div>

    <!-- Dashboard Row -->
    <div class="row">

    <!-- Settings -->
      <div class="col"> 
        <div class="card">
        <div class="row">
          <selector-version class="switch col" :all="['individu', 'team']" :selectedTypes="selectedVersion" @clicked="changeVersion"> </selector-version>
          <div class="col"> wk <input class="input-week-num" type="number" v-model.number="selectedWeek"> </div>

          <!-- <selector-version class="selector" :all="['wk1', 'wk2', 'wk3']" :selectedTypes="selectedWeeks" @clicked="changeWeeks"> </selector-version> -->
        </div>
        </div>
      </div>

      <div class="col dashboard-text">
        <h3 v-if="selectedVersion.includes('team')"> Team </h3> 
        <h3 v-if="selectedVersion.includes('team') && selectedVersion.includes('individu')"> & </h3> 
        <h3 v-if="selectedUser && selectedVersion.includes('individu')"> {{getFirstnameOf(selectedUser)}} </h3> 
        <h3> Dashboard </h3>
      </div>
      </div>
      
    <div class="row">
            <!-- <selector-type :selectedTypes="selectedArray" @clicked="filterExercises"> </selector-type> -->
    <!-- Personal stats -->
      <card-total-exercises v-if="selectedUser && selectedVersion.includes('individu')" :exercises="exercisesOfUser" > </card-total-exercises>
      <card-over-time v-if="selectedUser && selectedVersion.includes('individu')" :exercises="exercisesOfUser"> </card-over-time>
     
      <hr v-if="selectedVersion.includes('team') && selectedVersion.includes('individu')"> 

    <!-- Team stats -->
      <card-total-exercises v-if="selectedVersion.includes('team')" :exercises="exercises" > </card-total-exercises>
      <card-over-time v-if="selectedVersion.includes('team')" :exercises="exercises"> </card-over-time>
      <CardTop3 v-if="selectedVersion.includes('team')" :exercises="exercises" :members="members" :amountOfTop="3"> </CardTop3>
    </div>

    <hr>


    <div class="row justify-content" v-if="selectedUser">

      <div class="col-sm">
        <div class="card exercise-card" style="align-items: flex-end;">

          <b-button v-on:click="showModal = true" :disabled="userLoggedIn !== selectedUser" style="width: 50px;">
            +
          </b-button>
        </div>
      </div>

    <!-- Exercises row -->
      <div v-for="exercise in exercisesOfUser" :key="exercise['.key']" class="col-sm">

          <div class="card  exercise-card">

            <div class="row justify-content-center">

              <div class="col">
                <i class="material-icons">{{exercise.type.icon}}</i>
                <br/>
                {{formatDate(exercise.date)}}
              </div>
              <div class="col">
                {{exercise.hours}}u
                <br/>
                {{exercise.minutes}}m
              </div>
              <div class="col">
                <b-button v-on:click="(showModal = true) && (selectedExercise = exercise) && (updateExercise = true)" :disabled="userLoggedIn !== selectedUser"> 
                  <i class="material-icons">edit</i>
                </b-button>
              </div>

            </div>
            <hr v-if="exercise.text">
            <div v-if="exercise.text" class="row">
              <p class="optional-comments"> {{exercise.text}} </p>
            </div>

        </div>

      </div>
    </div>

    <!-- Modals -->
    <modal-auth :email_user="selectedUser" v-if="showLoginModal" @close="(showLoginModal = false)">
    </modal-auth>

    <modal-exercise :email_user="selectedUser" :team="selectedTeam" :exercise="selectedExercise" :update="updateExercise" v-if="showModal" @close="resetValues()">
    </modal-exercise>
  </div>
</template>



<script>
import { db } from '../firebase'
import moment from 'moment'
import firebase from 'firebase'
import ModalExercise from '../elements/ModalExercise.vue'
import ModalAuth from '../elements/ModalAuth.vue'
import CardTop3 from '../elements/CardTop3.vue'
import CardTotalExercises from '../elements/CardTotalExercises.vue'
import CardOverTime from '../elements/CardOverTime.vue'
import SelectorVersion from '../elements/SelectorVersion.vue'
import SelectorType from '../elements/SelectorType.vue'

export default {
  name: 'home',
  components: {
    ModalExercise,
    ModalAuth,
    CardTop3,
    CardTotalExercises,
    CardOverTime,
    SelectorVersion,
    SelectorType
  },
  props: {
    ndt_exercises: {type: Array},
    nmt_exercises: {type: Array},
    not_exercises: {type: Array}
  },
  data () {
    return {
      showModal: false,
      showLoginModal: false,
      userLoggedIn: null,
      selectedTeam: this.$route.path.slice(1),
      selectedUser: null,
      selectedExercise: null,
      selectedVersion: ['individu'],
      selectedWeek: Number(moment(new Date()).isoWeekday(1).format('w')),
      selectedArray: require(`../../static/workout_types.json`).map(w => { return w.name }).slice(0, -1),
      exercisesOfUser: null,
      // selected_week: moment(new Date()).format('w'),
      updateExercise: false,
      members: require(`../../static/${this.$route.path.slice(1).toUpperCase()}.json`)
    }
  },
  methods: {
    resetValues () {
      this.updateExercise = false
      this.showModal = false
    },
    dropDown () {
      var members = require(`../../static/${this.selectedTeam.toUpperCase()}.json`)
      if (members[0]) {
        const list = []
        members.forEach(user => {
          list.push({value: user.email_address, text: `${user.firstname} ${user.lastname}`})
        })
        return list
      }
    },
    getFirstnameOf (email) {
      var firstname = this.members.find(m => m.email_address === email).firstname
      if (this.needsJustS(firstname)) firstname += 's'
      else firstname += "'"
      return firstname
    },
    needsJustS (name) {
      var last = name.split('')[name.length - 1]
      if (last === 's') return false
      if (last === 'z') return false
      if (last === 'h' && (name.split('')[name.length - 2] === 'c')) return false
      else return true
    },
    filterExercises (value) {
      console.log(value)
      this.selectedArray = value
    },
    exercisesOfUserPerWeek () {
      const exercises = this.exercisesOfUser
      const perWeek = [] // [{id: 52, exercises []}]
      exercises.forEach(e => {
        const exerciseWeekNo = moment.unix(e.date.seconds).format('w')
        const week = perWeek.find(w => { return exerciseWeekNo === w.id })
        if (!week) {
          perWeek.push({id: exerciseWeekNo, exercises: [e]})
        } else week.exercises.push(e)
      })
      return perWeek.sort((a, b) => { return b.id - a.id })
    },
    formatDate (date) {
      return moment(date.toDate()).format('D-MMM')
    },
    changeVersion (value) {
      this.selectedVersion = value
    },
    logOut () {
      firebase.auth().signOut().then(() => {
        this.userLoggedIn = null
      }).catch((err) => {
        console.log(err)
        alert(err.message)
      })
    }
  },
  computed: {
    exercises: {
      get () {
        const exercises = this.selectedTeam === 'ndt' ? this.ndt_exercises : (this.selectedTeam === 'nmt' ? this.nmt_exercises : this.not_exercises)
        return exercises
      },
      set (value) {
        // console.log('We do not want to remember old exercises so we do nothing with this setter')
      }
    }
  },
  watch: {
    $route (to, from) {
      this.selectedTeam = to.path.slice(1)
      this.$bind('members', db.collection(`${this.selectedTeam}_members`).orderBy('firstname'))
      this.$bind('exercises', db.collection(`${this.selectedTeam}_exercises`))
    },
    selectedUser () {
      var result = this.exercises.filter(item => item.userId === this.selectedUser)
      this.exercisesOfUser = result.sort((a, b) => { return b.date.seconds - a.date.seconds })
    }
  },
  created () {
    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user)
      }, reject)
    }).then(data => {
      console.log('created ')
      this.userLoggedIn = data.email
      this.selectedUser = data.email
    })
  }
}
</script>

<style scoped>
.exercise-card {
  max-width: 250px;
  min-width: 200px;
}

.input-week-num {
  width: 30px;
}

.user-login > *{
  margin: 1rem;
}

.dashboard-text > h3 {
  color: white;
}

.inline > * {
  display: inline;
}

.switch {
    min-width: 140px;
}

.optional-comments {
  white-space: pre-line; /* Luistert naar \n */
  text-align: left;
  padding-left: 1.5rem;
  color: grey;
  /* padding-bottom: 0; */
  /* max-height: 4rem;
  overflow: hidden; */
  /* text-overflow: ellipsis;  /* Deze zou (...) moeten maken, maar doet het niet omdat in white-space pre-line wil en het alleen voor width geldt */
}

</style>
