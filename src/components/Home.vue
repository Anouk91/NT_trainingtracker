<template>
  <div class="hello">
    <datescroller :datelist="dates" />
    <div style="margin: 20px;">
      <label>Selecteer een user</label>
      <select>
        <option
          :key="user.id"
          v-for="user in users_local"
          value="user.firstname"
        >
          {{ user.firstname }}
        </option>
      </select>
      <div class="logging_grid">
        <button v-for="type in workout_types" :key="type.id">
          {{ type.firstname }}
        </button>
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
      today: new Date(),
      users_local: [
        {
          id: '77nRofkS0AlQ1u16NwPv',
          firstname: 'Anna',
          lastname: 'Hoefnagels'
        },
        {
          id: 'A4kUyv2JPhcTJSTtHMjF',
          firstname: 'Anniek',
          lastname: 'Leinenga'
        },
        { id: '5m6HhvhJ7hHE6IcKRgTT', firstname: 'Anouk', lastname: 'Boukema' },
        {
          id: '8t1ykXymRJBLsRXGocM6',
          firstname: 'Britt',
          lastname: 'de Bruijn'
        },
        {
          id: 'bLSAx8lL0XNmYPYz62B7',
          firstname: 'Charlotte',
          lastname: 'Verheij'
        },
        {
          id: '38W7Udb7iZwrGFYRMcI6',
          firstname: 'Camilla',
          lastname: 'van Wirdum'
        },
        { id: 'ILbIQ0BIeJXYonsqwJZw', firstname: 'Eline', lastname: 'Wilhelm' },
        { id: 'HbYi5oIsSkMvTv6HzuTL', firstname: 'Iris', lastname: 'Leinenga' },
        { id: 'z0t4LTzzAo763VavIQju', firstname: 'Iris', lastname: 'Terpstra' },
        {
          id: '0qJT3xW1BFdCcIDhrktA',
          firstname: 'Jill',
          lastname: 'Steenkist'
        },
        { id: 'a1n0QQuDnwJBo7xjpHj0', firstname: 'Joske', lastname: 'Brouwer' },
        { id: 'MmQygeTZkmNaQEyPodh3', firstname: 'Linde', lastname: 'Wits' },
        { id: 'zm9fjuG9UwFhTSA8vTIm', firstname: 'Lisa', lastname: 'Wohlrab' },
        {
          id: 'R6IYa0zKzkCgdR4gRj6S',
          firstname: 'Mirte',
          lastname: 'van der Lee'
        },
        { id: '8UEoDBL3KN5uDftXZKns', firstname: 'Nena', lastname: 'Ruijs' },
        { id: 'ux2Sx19OXDq2yEblPbOO', firstname: 'Paula', lastname: 'Baas' },
        {
          id: 'H8Ag78e9m4U0kuiPnE0H',
          firstname: 'Roos',
          lastname: 'Maaike Denisse'
        },
        { id: 'AockYXZeoYf1xGOHjewS', firstname: 'Sarah', lastname: 'Sparks' },
        {
          id: '4gpRUiuVO1vknaeSg3SF',
          firstname: 'Suzanne',
          lastname: 'Delwel'
        },
        {
          id: 'bYbtfXX2oKI6gYMiiolH',
          firstname: 'Tess',
          lastname: 'van Middelaar'
        },
        { id: 'cXmkW4LBc9SaFZRXWLeR', firstname: 'Tirza', lastname: 'Moerman' },
        { id: 'rpVd9PoCTsFuKbQ98aZ3', firstname: 'Julia', lastname: 'Ose' },
        { id: 'gGxzMHEDmyy7Rr92Aycc', firstname: 'Rixt', lastname: 'Hofman' }
      ]
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
