<template>
  <div class="container">

    <div class="row">
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
                <br/>
              </div>

              <div class="col">
                <b-button v-on:click="(showModal = true) && (selected_exercise = exercise) && (update_exercise = true)" > 
                  <i class="material-icons">edit</i>
                </b-button>
              </div>

            </div>
            
              <hr>
            <div :v-if="exercise.text" class="row">
              <p class="optional-comments" > {{exercise.text}} </p>
            </div>

          </div>
        </div>

      </div>
    </div>

    <exercise-modal :email_user="selected_user" :toUpdateExercise="selected_exercise" :update_exercise="update_exercise" v-if="showModal" @close="(showModal = false) && (update_exercise=false)">
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
      selected_user: null,
      selected_exercise: null,
      selected_week: moment(new Date()).format('w'),
      update_exercise: false,
      users: [],
      exercises: []
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname'),
      exercises: db.collection('exercises'),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    dropDown () {
      var dropdownList = []
      this.users.forEach(user => {
        dropdownList.push({value: user.email_address, text: `${user.firstname} ${user.lastname}`})
      })
      return dropdownList
    },
    exericesOfUser () {
      var exercisesOfUser = this.exercises.filter(item => item.userId === this.selected_user)
      console.log(exercisesOfUser)

      return exercisesOfUser
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
      return perWeek
    },
    formatDate (date) {
      return moment.unix(date.seconds).format('D-MMM')
    }
  }
}
</script>

<style scoped>
.optional-comments {
  white-space: pre-line; /* Luistert naar \n */
  text-align: left;
  padding: 1.5rem;
  padding-bottom: 0;
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
