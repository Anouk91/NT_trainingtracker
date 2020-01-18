<template>
  <div class="background">
    <main>
      <router-view :ndt_exercises="ndt_exercises" :nmt_exercises="nmt_exercises" :not_exercises="not_exercises"/>
    </main>
    <footer>
  <!-- Image and text -->
  <b-navbar toggleable="lg" >
      <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Leeuw"> -->
      <b-navbar-brand :to="'/'" active>

      <img src="../static/img/nederland-orange.jpg" class="d-inline-block align-top lion" alt="Lion" >
      </b-navbar-brand>
      <b-navbar-nav v-for="link in links" :key="link.to">
      <b-nav-item :to="link.to">{{link.name}}</b-nav-item>
      <!-- <b-nav-item :to="link.to">{{link.name}}</b-nav-item> -->
      </b-navbar-nav>

  </b-navbar>
    </footer>
  </div>
</template>


<script>
import { db } from './firebase'
import moment from 'moment'

export default {
  data: () => ({
    links: [
      {
        name: 'Dames',
        to: '/ndt'
      },
      {
        name: 'Mixed',
        to: '/nmt'
      },
      {
        name: 'Open',
        to: '/not'
      },
      {
        name: 'Gym',
        to: '/exercises'
      }
    ],
    ndt_exercises: [],
    ndt_pw_pt: [],
    nmt_exercises: [],
    not_exercises: []
  }),
  firestore () {
    return {
      ndt_exercises: db.collection('ndt_exercises').orderBy('date'),
      nmt_exercises: db.collection('nmt_exercises').orderBy('date'),
      not_exercises: db.collection('not_exercises').orderBy('date')
    }
  },
  watch: {
    ndt_exercises () {
      var result = [] // [{weekNum: 1, types: {type: 'Strength', exercises: []}}]
      var weekResult = { number: 0 }

      this.ndt_exercises.forEach(e => {
        var weekNum = Number(moment.unix(e.date.seconds).isoWeekday(1).format('w'))
        if (weekNum < 50) {
          // push week result and initialize new
          if (weekNum !== weekResult.number) {
            if (weekResult.number !== 0) result.push(weekResult)

            weekResult = { number: weekNum,
              types: [
                {name: 'Team Training', exercises: []},
                {name: 'Throwing', exercises: []},
                {name: 'Strength', exercises: []},
                {name: 'Endurance', exercises: []},
                {name: 'Other', exercises: []}
              ] }
          }

          var type = weekResult.types.find(t => t.name === e.type.name)
          type.exercises.push(e)
        }
      })
      result.push(weekResult)
      this.ndt_pw_pt = result
    }
  }
}
</script>

<style>
.vdp-datepicker__calendar {
  left: -20px;
}
:root {
  --primary-color: #ff6600;
  background-color: #ff6600;
}
.navbar {
  border-top: 1px solid  var(--primary-color);
  background-color: white;
}

.lion {
  -webkit-clip-path: circle(50% at 50% 50%); 
  clip-path: circle(50% at 50% 50%);
  width: 2rem;
  height: 2rem;
}

main {
  text-align: center;
  margin-bottom: 56px;
}
footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.card {
  margin: 1rem auto;
  justify-content: center;
  padding: 1rem;
}

/* .dashboard-card {
  background-color: #fff0e6;
} */
.background {
  background-color: var(--primary-color);
}
.color {
  color: var(--primary-color) 
}

.lastRow {
  padding-bottom: 1rem;
}


</style>