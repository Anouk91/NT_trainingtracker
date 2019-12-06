<template>
<div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container">

          <div class="modal-header row">
            <slot name="header">
              <h2> New Exercise </h2>
                <b-button 
                variant="outline-danger"
                class="modal-default-button" @click="$emit('close')">
                x
              </b-button>
            </slot>
          </div>

          <div class="modal-body row">
            <slot name="body">
              <div class="row">
              <p class="col">Exercised on </p> <Datepicker class="col" v-model="selected_date"></Datepicker>
          </div>
              <b-form-select v-model="selected_exercise" :options="exerciseDropdown()">
                <option :value="null" disabled>-- Selecteer het type training dat je hebt gedaan --</option>
              </b-form-select>
              <b-form-textarea id="textarea"
                v-model="description_exercise"
                placeholder="Optional extra info about your exercise"
                rows="3"
                max-rows="6"></b-form-textarea>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <b-button 
              class="modal-default-button" @click="$emit('close') && addExercise( selected_exercise, description_exercise)" 
              :disabled="!selected_exercise"
              variant="success">
                Save 
              </b-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { db } from '../firebase'

export default {
  name: 'exercise-modal',
  props: {
    email_user: {
      type: String,
      required: true
    }
  },
  components: {
    Datepicker
  },
  data () {
    return {
      selected_date: new Date(),
      selected_user: this.email_user,
      workout_types: [],
      users: [],
      description_exercise: null,
      selected_exercise: null
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('firstname'),
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    addExercise (exercise, text) {
      var userId = this.email_user
      var splittedText = text.split('\n')
      db.collection('exercises').add({userId, exercise, splittedText})
    },
    exerciseDropdown () {
      var dropdownList = []

      this.workout_types.forEach(exercise => {
        dropdownList.push({value: exercise, text: exercise.name})
      })
      return dropdownList
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>