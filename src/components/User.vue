<template>
  <div class="container">

    <div class="row">
      <top3 :exercises="this.exercises" :members="this.members"> </top3>
      <total-exercises :exercises="this.exercises" > </total-exercises>
    </div>

    <div class="row">
    
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
      <div class="col">
        <b-button v-on:click="showModal = true" :disabled="!selectedUser" variant="primary">
          Add Exercise
        </b-button>
      </div>
    </div>
    <!-- <div class="row">
      <div v-for="week in exercisesOfUserPerWeek()" :key="week.id">
        <div class="col card">
          {{week.exercises.length}} Exercises done in week {{week.id}}
        </div>
      </div>
    </div> -->

    <div class="row" v-if="selectedUser">
      <div v-for="exercise in exericesOfUser()" :key="exercise['.key']">

        <div class="col-sm">
          <div class="card">

            <div class="row justify-content-center">

              <div class="col">
                <i class="material-icons">{{exercise.type.icon}}</i>
                <br/>
                {{formatDate(exercise.date)}}
              </div>
              <div class="col">
                {{exercise.hours}}h
                <br/>
                {{exercise.minutes}}m
              </div>
              <div class="col">
                <b-button v-on:click="(showModal = true) && (selectedExercise = exercise) && (updateExercise = true)" > 
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
    </div>

    <exercise-modal :email_user="selectedUser" :team="selectedTeam" :exercise="selectedExercise" :updateExercise="updateExercise" v-if="showModal" @close="(showModal = false) && (updateExercise=false)">
    </exercise-modal>

  </div>
</template>



<script>
import { db } from '../firebase'
import moment from 'moment'
import ExerciseModal from '../elements/ExerciseModal.vue'
import Top3 from '../elements/Top3.vue'
import TotalExercises from '../elements/TotalExercises.vue'

export default {
  name: 'home',
  components: {
    ExerciseModal,
    Top3,
    TotalExercises
  },
  data () {
    return {
      showModal: false,
      selectedTeam: this.$route.path.slice(1),
      selectedUser: null,
      selectedExercise: null,
      // selected_week: moment(new Date()).format('w'),
      updateExercise: false,
      exercises: [],
      members: []
    }
  },
  firestore () {
    return {
      members: db.collection(`${this.selectedTeam}_members`).orderBy('firstname'),
      exercises: db.collection(`${this.selectedTeam}_exercises`),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    dropDown () {
      if (this.members[0]) {
        const list = []
        this.members.forEach(user => {
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
      return moment.unix(date.seconds).format('D-MMM')
    },
    isActive (team) {
      return team === this.selectedTeam ? ' active' : ''
    }
  },
  watch: {
    $route (to, from) {
      this.selectedTeam = to.path.slice(1)
      this.$bind('members', db.collection(`${this.selectedTeam}_members`).orderBy('firstname'))
      this.$bind('exercises', db.collection(`${this.selectedTeam}_exercises`))
    }
  }
}
</script>

<style scoped>

.btn-team {
  font-size: 0;
  margin-bottom: .5rem;
}
.btn-team > * {
  display: inline-block;
  font-size: 16px;
  padding: .4rem;
  color: white;
  background-color: #f28a26;
  cursor: pointer;
}
.active {
  background-color: #ec5d22;
}
.left {
  border-radius: 10px 0px 0px 10px;
}

.right {
  border-radius: 0px 10px 10px 0px;
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

/* Overwrite styling of App.vue */
.card {
  padding: 1rem;
  background-color: white;
}

</style>
