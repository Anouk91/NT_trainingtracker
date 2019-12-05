<template>
  <div class="hello">
    <datescroller :datelist="dates" />
    <div style="margin: 20px;">
      <b-form-select v-model="selected_user" :options="dropDown()">
        <option :value="null" disabled>-- Selecteer jezelf --</option>
      </b-form-select>

      <b-form-select v-model="selected_exercise" :options="exercise_dropdown">
        <option :value="null" disabled>-- Selecteer het type training dat je hebt gedaan --</option>
      </b-form-select>
      <b-form-textarea id="textarea"
        v-model="description_exercise"
        placeholder="Optional extra info about your exercise"
        rows="3"
        max-rows="6"
        v-if="selected_user && selected_exercise"></b-form-textarea>
        <b-button v-if="selected_user && selected_exercise" v-on:click="addExercise(selected_user, selected_exercise, description_exercise)">
          Save 
        </b-button>


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
      selected_exercise: null,
      selected_date: this.today,
      users: [],
      description_exercise: '',
      workout_types: [],
      exercise_dropdown: [
        {value: 1, text: 'Strength'},
        {value: 2, text: 'Conditioning'},
        {value: 3, text: 'Team Training'},
        {value: 4, text: 'Throwing'},
        {value: 5, text: 'Other'}
      ],
      today: new Date()

    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname'),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    addDays (date, days) {
      var result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    },
    getDateArray: function (days) {
      var arr = []
      var today = new Date()
      var dt = this.addDays(today, -7)

      while (dt <= today) {
        arr.push(dt)
        dt = this.addDays(dt, 1)
      }
      return arr
    },
    addExercise (userId, exerciseId, text) {
      db.collection('exercises').add({userId, exerciseId, text})
    },
    dropDown () {
      var dropdownList = []

      this.users.forEach(user => {
        dropdownList.push({value: user['.key'], text: `${user.firstname} ${user.lastname}`})
      })
      console.log(this.users, dropdownList)
      return dropdownList
    }
  },
  components: {
    datescroller
  },
  created () {
    this.dates = this.getDateArray(7)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}

.logging_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

button {
  height: 100px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
  background-color: lightblue;
  font-size: 2rem;
  color: #333;
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 50%,
    rgba(0, 0, 0, 0.04)
  );
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.15),
    0 1px 0 0 rgba(255, 255, 255, 0.15);
  text-shadow: 0 1px rgba(255, 255, 255, 0.4);
}

button:hover {
  background-color: #eaeaea;
}
</style>
