<template>
  <div class="container">
    <div class="row justify-content-between">
    <b-button v-on:click="addListToDB(dailiesNov, 'dailies')" class="btn col btn-success"> Import Dailies november </b-button>
    <b-button v-on:click="deletePlayers(dailies, 'dailies')" class="btn col btn-warning"> Delete Dailies </b-button>
    <b-button v-on:click="changeExercises()" class="btn col btn-warning"> change Exercises to number </b-button>
  </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import dailiesNov from '../../static/dailies_nov.json'

export default {
  name: 'home',
  props: {
    nmt_exercises: {type: Array}
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
    changeExercises () {
      console.log('start', this.nmt_exercises.length, this.nmt_exercises[0])
      // if (this.nmt_exercises) {
      for (let i = 0; i < this.nmt_exercises.length; i++) {
        const e = this.nmt_exercises[i]
        if (typeof e.hours === 'string') {
          if (e.hours.length <= 1) {
            console.log(e.hours, Number(e.hours), e.id)
            db.collection('nmt_exercises').doc(e.id).update({hours: Number(e.hours)})
          } else console.log('Help hours', e.hours)
        }
        if (typeof e.minutes === 'string') {
          if (e.minutes.length <= 2) {
            console.log(e.minutes, Number(e.minutes))
            db.collection('nmt_exercises').doc(e.id).update({minutes: Number(e.minutes)})
          } else console.log('Help minutes', e.minutes)
        }
      // db.collection(theDB).doc(x.id)
        // }
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