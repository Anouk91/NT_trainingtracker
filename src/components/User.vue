<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Excersises
      </h2>

      <b-table striped hover :items="exercises" >
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
      <!-- <ul v-if="errors && errors.length" >
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul> -->
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
export default {
  name: 'BookList',
  data () {
    return {
      exercises: [
          {
              dailies: [{date: "27-11-2019", name: "legs", minutes: "35"},
             {date: "27-11-2019", name: "legs", minutes: "35"}],
            training: 2,
            
             }
             
            ],
      errors: []
    }
  },
//   created () {
//     axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; 

//     axios.get(`http://localhost:3000/book`)
//     .then(response => {
//       this.books = response.data;
//       console.log(this.books)
//     })
//     .catch(e => {
//       this.errors.push(e)
//     })
//   },
//   methods: {
//     details (book) {
//       this.$router.push({
//         name: 'ShowBook',
//         params: { id: book._id }
//       })
//     }
//   }
}
</script>