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
            <p class=""> {{exercise.exercise.name}}</p>
          </div>
          <div class="" v-for="(line, index) in exercise.splittedText" :key="`line ${index}`">
           <p> {{line}} <br> </p>
          </div>
          <b-button class="col-1" > Edit </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { db } from '../firebase'
import datescroller from '../elements/datescroller.vue'

export default {
  name: 'home',
  data () {
    return {
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
    }
  },
  components: {
    datescroller
  },
  created: function () {
    this.dates = this.getDateArray(7)
  }
}
</script>
