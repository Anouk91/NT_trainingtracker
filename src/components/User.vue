<template>
  <div class="container">

    <!-- Select user row + settings -->
    <div class="row user-login">
      <div :class="`switch ${selectedType === 'individu'? 'active': 'inactive'}`" @click="selectedType= 'individu'">Speler</div>
      <div :class="`switch ${selectedType === 'team'? 'active': 'inactive'}`" @click="selectedType= 'team'">Team</div>
      <!-- <selector-radio class="switch" :all="['individu', 'team']" :selected="selectedType" @clicked="changeType"> </selector-radio> -->
    </div>
    <div class="row">
      <div class="col">
        <b-form-select v-model="selectedUser" :options="dropDown()" :key="selectedTeam">
          <option :value="null" disabled>-- Selecteer gebruiker --</option>
        </b-form-select>
      </div>
      <b-button class=" button" v-if="!userLoggedIn" v-on:click="showLoginModal = true" :disabled="!selectedUser" variant="primary"> login </b-button>
      <b-button class=" button" v-if="userLoggedIn" v-on:click="logOut()" variant="warning"> logout </b-button>
      <!-- <b-button to='team-page'> team </b-button> -->
      <!-- <div style="color: white;"> wk <input class="week-input" type="number" v-model.number="selectedWeek"> </div> -->
    </div>


    <!-- Team stats -->
    <div class="row" v-if="selectedType == 'team'">
      <!-- <h3 class="dashboard-text col-12"> Team Dashboard </h3> -->
      <card-total-exercises :exercises="exercises" > </card-total-exercises>
      <card-over-time :exercises="exercises"> </card-over-time>
      <CardTop3 :exercises="exercises" :members="members" :amountOfTop="3"> </CardTop3>
    </div>

    <!-- Personal stats -->
    <div class="" v-if="selectedUser && (selectedType == 'individu')">
      <!-- <h3 class="dashboard-text col-12"> {{getFirstnameOf(selectedUser)}} Dashboard </h3> -->
      <card-total-exercises :exercises="exercisesOfUser(selectedUser, 'template cardte')" > </card-total-exercises>
      <card-over-time :exercises="exercisesOfUser(selectedUser, 'template cardot')"> </card-over-time>
     
    </div>

    
    <hr>

    <div class="row justify-content stretch" v-if="selectedUser">

      <div class="exercise">
        <div class="card exercise-card" style="align-items: flex-end;">

          <b-button v-on:click="showModal = true" :disabled="userLoggedIn !== selectedUser" style="width: 50px;">
            +
          </b-button>
        </div>
      </div>

    <!-- Exercises row -->
      <div v-for="exercise in exercisesOfUser(selectedUser, 'exercise Row')" :key="exercise['.key']" class="exercise">

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
import SelectorRadio from '../elements/SelectorRadio.vue'

export default {
  name: 'home',
  components: {
    ModalExercise,
    ModalAuth,
    CardTop3,
    CardTotalExercises,
    CardOverTime,
    SelectorVersion,
    SelectorRadio
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
      selectedType: this.selectedUser ? 'individu' : 'team',
      selectedWeek: Number(moment(new Date()).isoWeekday(1).format('w')),
      selectedArray: require(`../../static/workout_types.json`).map(w => { return w.name }).slice(0, -1),
      // exercisesOfUser: null,
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
      var firstname = this.userOfSelectedTeam(email) ? this.userOfSelectedTeam(email).firstname : 'No one'
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
      this.selectedArray = value
    },
    exercisesOfUserPerWeek () {
      const exercises = this.exercisesOfUser(this.selectedUser, 'function ex u pw')
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
    changeType (value) {
      this.selectedType = value
    },
    logOut () {
      firebase.auth().signOut().then(() => {
        this.userLoggedIn = null
      }).catch((err) => {
        console.log(err)
        alert(err.message)
      })
    },
    exercisesOfUser (userId, triggeredBy) {
      var result = this.exercises.filter(item => item.userId === userId)
      // console.log('setting by', triggeredBy, result.length)
      return result.sort((a, b) => { return b.date.seconds - a.date.seconds })
    },
    userOfSelectedTeam (user) {
      return this.members.find(m => m.email_address === user)
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
      },
      selectedType: {
        get () {
          console.log('getter')
          return this.selectedUser ? 'individu' : 'team'
        },
        set (value) {
          console.log('setter')
          console.log(value)
          this.selectedType = value
        }
      }
    }
  },
  watch: {
    $route (to, from) {
      this.selectedTeam = to.path.slice(1)
      this.$bind('members', db.collection(`${this.selectedTeam}_members`).orderBy('firstname'))
      this.$bind('exercises', db.collection(`${this.selectedTeam}_exercises`))
      console.log('1 ', this.email_user, this.selectedUser, this.userOfSelectedTeam(this.selectUser))
      if (!this.userOfSelectedTeam(this.selectUser)) this.selectedUser = null
      console.log('2', this.email_user, this.selectedUser)
      // const correspondingUsers = require(`../../static/${to.path.slice(1).toUpperCase()}.json`)
      // if (!correspondingUsers.find(u => { return u.email_address === this.email_user })) {
      //   console.log('setting selectedUser to null')
      //   this.selectedUser = null
      // }
      this.exercisesOfUser()
    },
    selectedUser (value) {
      console.log('3', this.email_user, this.selectedUser)
      this.exercisesOfUser(value, 'watch')
      this.selectedType = 'individu'
    }
  },
  created () {
    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user)
      }, reject)
    }).then(data => {
      if (data) {
        this.userLoggedIn = data.email
        console.log('created', this.userOfSelectedTeam(data.email), data.email)
        this.selectedUser = this.userOfSelectedTeam(data.email) ? data.email : null
        // this.exercisesOfUser(data.email, 'created')
      }
      // var result = this.exercises.filter(item => item.userId === data.email)
      // this.exercisesOfUser = result.sort((a, b) => { return b.date.seconds - a.date.seconds })
    })
  }
}
</script>

<style scoped lang="scss">
.button {
  margin-right: 15px;
}

.exercise-card {
  max-width: 250px;
  min-width: 200px;
}
.exercise {
  margin: 3px;
}

.stretch {
  align-items: stretch;
  
}
.switch {
  width: 50%;
  padding: 1rem;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
 }
}

.active {
  font-weight: bold;
  font-size: 20px;
 }  
.inactive {

  color: white;

  border-style: solid 2px;
  border-radius: 0 0 20px 20px;
}


.week-input {
 width: 2.4rem;
 border-radius: 5px;
}

.user-login{
  align-items: center;
}
/* .user-login > * {
  margin: 1rem;
} */

.dashboard-text {
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
