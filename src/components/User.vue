<template>
  <div>
    <b-form-select v-model="selected_user" :options="dropDown()">
        <option :value="null" disabled>-- Selecteer jezelf --</option>
    </b-form-select>

    <div v-if="selected_user" >
      <div class='card' v-for="exercise in exericesOfUser()" :key="exercise['.key']">
        <div class="card-body">
          {{exercise }}
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
      users: db.collection('users'),
      exercises: db.collection('exercises'),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    dropDown () {
      var dropdownList = []
      this.users.forEach(user => {
        dropdownList.push({value: user['.key'], text: `${user.firstname} ${user.lastname}`})
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
