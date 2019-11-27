<template>
  <div class="hello">
    <datescroller :datelist="dates" />
    <div style="margin: 20px;">
      <label>Selecteer een user</label>
      <select>
        <option
        v-for="user in users"
        value="user.name">{{user.name}}
        </option>
      </select>
      <div class="logging_grid">
        <button v-for="type in workout_types">{{type.name}}</button>
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
      users: [],
      workout_types: [],
      today: new Date()
    }
  },
  firestore () {
    return {
      users: db.collection('users'),
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
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
  color: #35495E;
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
  background-image: linear-gradient(to bottom,transparent,transparent 50%,rgba(0,0,0,.04));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 0 rgba(255,255,255,.45), inset 0 -1px 0 0 rgba(255,255,255,.15), 0 1px 0 0 rgba(255,255,255,.15);
  text-shadow: 0 1px rgba(255,255,255,.4);
}

button:hover {
  background-color: #eaeaea;
}
</style>
