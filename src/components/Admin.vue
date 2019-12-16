<template>
  <div class="container">
    <div class="row justify-content-between">
    <b-button v-on:click="addListToDB(ndt, 'ndt_members')" class="btn col btn-success"> Import dames players </b-button>
    <b-button v-on:click="addListToDB(nmt, 'nmt_members')" class="btn col btn-success"> Import mixed players </b-button>
    <b-button v-on:click="addListToDB(not, 'not_members')" class="btn col btn-success"> Import open players </b-button>
  </div>
    <div class="row justify-content-between">
    <b-button v-on:click="deletePlayers(ndt, 'ndt_members')" class="btn col btn-warning"> Delete dames  </b-button>
    <b-button v-on:click="deletePlayers(nmt, 'nmt_members')" class="btn col btn-warning"> Delete mixed </b-button>
    <b-button v-on:click="deletePlayers(not, 'not_members')" class="btn col btn-warning"> Delete open </b-button>
  </div>
    <div class="row justify-content-between">
    <b-button v-on:click="addListToDB(dailiesNov, 'dailies')" class="btn col btn-success"> Import Dailies november </b-button>
    <b-button v-on:click="deletePlayers(dailies, 'dailies')" class="btn col btn-warning"> Delete Dailies </b-button>
    <b-button v-on:click="deleteExercises(exercises, 'exercises')" class="btn col btn-warning"> Delete Exercises </b-button>
  </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import ndt from '../../static/NDT.json'
import nmt from '../../static/NMT.json'
import not from '../../static/NOT.json'
import dailiesNov from '../../static/dailies_nov.json'

export default {
  name: 'home',
  data () {
    return {
      users: [],
      dailies: [],
      exercises: [],
      dailiesNov,
      ndt,
      nmt,
      not
    }
  },
  firestore () {
    return {
      ndt: db.collection('ndt_members'),
      nmt: db.collection('nmt_members'),
      not: db.collection('not_members'),
      dailies: db.collection('dailies'),
      exercises: db.collection('exercises')
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
        db.collection(theDB).doc(x['.key']).delete()
      })
    },
    deleteExercises (theList, theDB) {
      theList.forEach(x => {
        db.collection(theDB).doc(x['.key']).delete()
      })
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