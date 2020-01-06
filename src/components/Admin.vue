<template>
  <div class="container">
    <div class="row justify-content-between">
    <b-button v-on:click="addListToDB(dailiesNov, 'dailies')" class="btn col btn-success"> Import Dailies november </b-button>
    <b-button v-on:click="deletePlayers(dailies, 'dailies')" class="btn col btn-warning"> Delete Dailies </b-button>
    <b-button v-on:click="changeExercises(exercises, 'exercises')" class="btn col btn-warning"> change Exercises to number </b-button>
  </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import dailiesNov from '../../static/dailies_nov.json'

export default {
  name: 'home',
  props: {
    ndt_exercises: {type: Array}
  },
  data () {
    return {
      dailies: [],
      dailiesNov
    }
  },
  firestore () {
    return {
      dailies: db.collection('dailies')
    }
  },
  methods: {
    addListToDB (theList, theDB) {
      theList.forEach(x => {
        db.collection(theDB).add(x)
      })
    },
    deletePlayers (theList, theDB) {
      theList.forEach(x => {
        db.collection(theDB).doc(x.id).delete()
      })
    },
    changeExercises (theList, theDB) {
      console.log('start', this.ndt_exercises)
      if (this.ndt_exercises) {
        this.ndt_exercise.forEach(x => {
          console.log(typeof x.minutes, x.minutes)
        // db.collection(theDB).doc(x.id)
        })
      }
    }
  }
}
</script>

<style scoped>
.btn {
  width: 250px;
  margin: .5rem;
}
</style>