<template>
  <div class="container">

    <div class="row">
    
      <div class="col-sm btn-team">
        <div :class="'left' + isActive('ndt')" v-on:click="selected_team = 'ndt'">Dames</div>
        <div :class="isActive('nmt')" v-on:click="selected_team = 'nmt'">Mixed</div>
        <div :class="'right' + isActive('not')" v-on:click="selected_team = 'not'">Open</div>
      </div>
      <div class="col">
        <b-form-select v-model="selected_user" :options="dropDown()">
            <option :value="null" disabled>-- Selecteer jezelf --</option>
        </b-form-select>
      </div>
      <div class="col">
        <b-button v-on:click="showModal = true" :disabled="!selected_user" variant="primary">
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

    <div class="row" v-if="selected_user">
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
                <b-button v-on:click="(showModal = true) && (selected_exercise = exercise) && (update_exercise = true)" > 
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

    <exercise-modal :email_user="selected_user" :exercise="selected_exercise" :update_exercise="update_exercise" v-if="showModal" @close="(showModal = false) && (update_exercise=false)">
    </exercise-modal>

  </div>
</template>



<script>
import { db } from '../firebase'
import moment from 'moment'
import ExerciseModal from '../elements/ExerciseModal.vue'

export default {
  name: 'home',
  components: {
    ExerciseModal
  },
  data () {
    return {
      showModal: false,
      selected_team: 'ndt',
      selected_user: null,
      selected_exercise: null,
      selected_week: moment(new Date()).format('w'),
      update_exercise: false,
      exercises: []
    }
  },
  firestore () {
    return {
      ndt: db.collection('ndt_members').orderBy('firstname'),
      nmt: db.collection('nmt_members').orderBy('firstname'),
      not: db.collection('not_members').orderBy('firstname'),
      exercises: db.collection('exercises'),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    dropDown () {
      var dropdownList = []
      var playersList = this.selected_team === 'ndt' ? this.ndt : (this.selected_team === 'nmt' ? this.nmt : this.not)
      playersList.forEach(user => {
        dropdownList.push({value: user.email_address, text: `${user.firstname} ${user.lastname}`})
      })
      return dropdownList
    },
    exericesOfUser () {
      var exercisesOfUser = this.exercises.filter(item => item.userId === this.selected_user)
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
      return team === this.selected_team ? ' active' : ''
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

.card {
  padding: 1rem;
  width: 18rem;
  margin:1.5rem;
}

</style>
