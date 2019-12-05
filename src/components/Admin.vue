<template>
  <div>
    <b-button v-on:click="addListToDB(ntd, 'users')" class="btn btn-warning"> Import NTD players </b-button>
    <b-button v-on:click="deletePlayers(users, 'users')" class="btn btn-warning"> Delete Users </b-button>
    <b-button v-on:click="addListToDB(dailiesNov, 'dailies')"> Import Dailies november </b-button>
    <b-button v-on:click="deletePlayers(dailies, 'dailies')"> Delete Dailies </b-button>
  </div>
</template>

<script>
import { db } from '../firebase'
import ntd from '../../static/NTD.json'
import dailiesNov from '../../static/dailies_nov.json'

export default {
  name: 'home',
  data () {
    return {
      users: [],
      dailies: [],
      dailiesNov,
      ntd
    }
  },
  firestore () {
    return {
      users: db.collection('users'),
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
        db.collection(theDB).doc(x['.key']).delete()
      })
    }
  }
}
</script>
