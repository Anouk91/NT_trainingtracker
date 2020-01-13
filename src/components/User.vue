<template>
  <div class="container">

    <!-- <div class="row" >
      <div class="card"> 
        <selector-version :selectedTypes="selectedVersion" @clicked="changeVersion"> </selector-version>
      </div>
    </div> -->

    <div class="row" :v-if="selectedVersion.includes('team')">
      <total-exercises :exercises="this.exercises" > </total-exercises>
      <top3 :exercises="this.exercises" :members="this.members" :amountOfTop="3"> </top3>
    </div>
    <hr>

    <div class="row lastRow" :v-if="selectedVersion.includes('individu')">
    
      <!-- <div class="col-sm btn-team">
        <div :class="'left' + isActive('ndt')" v-on:click="selectedTeam = 'ndt'">Dames</div>
        <div :class="isActive('nmt')" v-on:click="selectedTeam = 'nmt'">Mixed</div>
        <div :class="'right' + isActive('not')" v-on:click="selectedTeam = 'not'">Open</div>
      </div> -->

      <div class="col">
        <b-form-select v-model="selectedUser" :options="dropDown()" :key="selectedTeam">
            <option :value="null" disabled>-- Selecteer jezelf --</option>
        </b-form-select>
      </div>
        <div class="col" v-if="!userLoggedIn">
        <b-button v-on:click="showLoginModal = true" :disabled="!selectedUser" variant="primary">
          login
        </b-button>
      </div>
      <div class="col" v-if="userLoggedIn">
        <b-button v-on:click="logOut()" variant="warning">
          logout
        </b-button>
      </div>
    </div>
    <!-- <div class="row">
      <div v-for="week in exercisesOfUserPerWeek()" :key="week.ids">
        <div class="col card">
          {{week.exercises.length}} Exercises done in week {{week.id}}
        </div>
      </div>
    </div> -->
    <div class="row justify-content" v-if="selectedUser">

      <div class="col-sm">
        <div class="card exercise-card" style="align-items: flex-end;">

          <b-button v-on:click="showModal = true" :disabled="userLoggedIn !== selectedUser" style="width: 50px;">
            +
          </b-button>
        </div>
      </div>

      <div v-for="exercise in exericesOfUser()" :key="exercise['.key']" class="col-sm">

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

    <modal-auth :email_user="selectedUser" v-if="showLoginModal" @close="(showLoginModal = false)">
    </modal-auth>

    <exercise-modal :email_user="selectedUser" :team="selectedTeam" :exercise="selectedExercise" :update="updateExercise" v-if="showModal" @close="resetValues()">
    </exercise-modal>
  </div>
</template>



<script>
import { db } from '../firebase'
import moment from 'moment'
import firebase from 'firebase'
import ExerciseModal from '../elements/ExerciseModal.vue'
import ModalAuth from '../elements/ModalAuth.vue'
import Top3 from '../elements/Top3.vue'
import TotalExercises from '../elements/TotalExercises.vue'
import SelectorVersion from '../elements/SelectorVersion.vue'

export default {
  name: 'home',
  components: {
    ExerciseModal,
    ModalAuth,
    Top3,
    TotalExercises,
    SelectorVersion
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
      // selected_week: moment(new Date()).format('w'),
      updateExercise: false,
      // exercises: [],
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
    exericesOfUser () {
      var exercisesOfUser = this.exercises.filter(item => item.userId === this.selectedUser)
      return exercisesOfUser.sort((a, b) => { return b.date.seconds - a.date.seconds })
    },
    exercisesOfUserPerWeek () {
      const exercises = this.exericesOfUser()
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
      console.log('changeVersion:', value, this.selectedVersion)
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
    }
  },
  created () {
    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user)
      }, reject)
    }).then(data => { this.userLoggedIn = data.email })
  }
}
</script>

<style scoped>
.exercise-card {
  max-width: 250px;
  min-width: 200px;
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
