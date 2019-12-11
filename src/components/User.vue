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

    <div v-if="selected_user" >
      <div class='card' v-for="exercise in exericesOfUser()" :key="exercise['.key']">
        <div class="card-body ">
          <div class="row">
          <div class="col-sm-1">
            
            <i class="material-icons"> {{exercise.type.icon}}</i>
          <div class="">
            {{formatDate(exercise.date)}}
          </div>
            <!-- <p class=""> {{exercise.type.name}}</p> -->
          </div>
          <div class="col ">
          <p class="optional-comments" >
            {{exercise.text}}
            </p>
            </div>
          <b-button class="col-sm-1" v-on:click="(showModal = true) && (selected_exercise = exercise) && (update_exercise = true)" > 
            <i class="material-icons"> edit</i>
          </b-button>
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
    formatDate (date) {
      return moment.unix(date.seconds).format('D-MMM')
    }
  }
}
</script>

<style>
.optional-comments {
  white-space: pre-line; /* Luistert naar \n */
  text-align: left;
  /* max-height: 4rem;
  overflow: hidden; */
  /* text-overflow: ellipsis;  /* Deze zou (...) moeten maken, maar doet het niet omdat in white-space pre-line wil en het alleen voor width geldt */
} 
</style>
