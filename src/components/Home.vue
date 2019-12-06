<template>
  <div class="container">

  <div class="row">
    
  </div>

    <!-- <datescroller :datelist="dates" /> -->
    <div class="row">
      <div class="col">
        <b-form-select v-model="selected_user" :options="userDropdown()">
          <option :value="null" disabled>-- Selecteer jezelf --</option>
        </b-form-select>
      </div>
      <div class="col">

        <!-- Trigger the modal with a button -->
        <b-button v-on:click="showModal = true" :disabled="!selected_user" variant="primary">
          Add Exercise
        </b-button>

      </div>
      <div class="row">
        <exercise-modal :email_user="selected_user"  v-if="showModal" @close="showModal = false">
        </exercise-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseModal from '../elements/ExerciseModal.vue'
import { db } from '../firebase'

export default {
  name: 'home',
  components: {
    ExerciseModal
  },
  data () {
    return {
      showModal: false,
      users: [],
      description_exercise: '',
      selected_user: null
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname')
    }
  },
  methods: {
    userDropdown () {
      var dropdownList = []

      this.users.forEach(user => {
        dropdownList.push({value: user.email_address, text: `${user.firstname} ${user.lastname}`})
      })
      return dropdownList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
