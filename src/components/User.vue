<template>
  <div class="container">
    <b-form-select v-model="selected_user" :options="dropDown()">
        <option :value="null" disabled>-- Selecteer jezelf --</option>
    </b-form-select>
    <div v-if="selected_user" >
      <div class='card' v-for="exercise in exericesOfUser()" :key="exercise['.key']">
        <div class="card-body ">
          <div class="row">
          <div class="col-1">
            
            <i class="material-icons"> {{exercise.exercise.icon}}</i>
            <!-- <p class=""> {{exercise.exercise.name}}</p> -->
          </div>
          <!-- <div class="col">
            {{formatDate(exercise.date)}}
          </div> -->
          <div class="col-10 optional-comments" >
            {{exercise.text}}
            </div>
          <b-button class="col-1"  v-on:click="showModal = true" > Edit </b-button>
          <exercise-modal :email_user="selected_user" :exercise="exercise"  v-if="showModal" @close="showModal = false">
          </exercise-modal>
          </div>
        </div>
      </div>
    </div>
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
  white-space: pre-line;
  text-align: left;
}

/* .card-body {
  padding: .5rem;
  background-color: grey;
} */
</style>
