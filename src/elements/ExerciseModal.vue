<template>
<div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container">

          <div class="modal-header row">
            <slot name="header">
              <h2> Training! </h2>
                <b-button
                variant="outline-danger"
                class="modal-default-button" @click="$emit('close')">
                x
              </b-button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="row justify-content-between">
                <Datepicker class="col date-input" v-model="exercise.date"></Datepicker> 
                <div class="col time-input">
                  <input v-model="exercise.hours">u
                  <input class="minute" v-model="exercise.minutes">m
                </div>
            </div>
              <b-form-select v-model="exercise.type" :options="exerciseDropdown()">
                <option :value="null" disabled>-- Selecteer type training --</option>
              </b-form-select>
              <b-form-textarea id="textarea"
                v-model="exercise.text"
                placeholder="Extra info (hoeft niet mag wel)"
                rows="3"
                max-rows="6"></b-form-textarea>
            </slot>
          </div>
          <!-- {{`${createText()}`}} -->
          <div class="modal-footer">
            <slot name="footer">
              <b-button 
              class="modal-default-button" @click="$emit('close') && saveExercise()" 
              :disabled="!exercise.type"
              variant="success">
                Opslaan 
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
    exercise: {type: Object},
    email_user: {type: String},
    team: {type: String},
    update: {type: Boolean}
  },
  components: {
    Datepicker
  },
  data () {
    return {
      workout_types: []
    }
  },
  firestore () {
    return {
      workout_types: db.collection('workout_types').orderBy('index')
    }
  },
  methods: {
    saveExercise () {
      // console.log(this.exercise, this.update)
      if (this.update) this.updateExercise()
      else this.addExercise()
    },
    addExercise () {
      db.collection(`${this.team}_exercises`).add(this.exerciseData())
    },
    updateExercise () {
      var docRef = db.collection(`${this.team}_exercises`).doc(this.exercise.id)
      // console.log('docRef', docRef)
      docRef.update(this.exerciseData())
    },
    exerciseData () {
      return {
        userId: this.email_user,
        type: this.exercise.type,
        text: this.exercise.text,
        date: this.exercise.date,
        hours: this.exercise.hours,
        minutes: this.exercise.minutes}
    },
    exerciseDropdown () {
      var dropdownList = []

      this.workout_types.forEach(type => {
        dropdownList.push({value: type, text: type.name})
      })
      return dropdownList
    }
  },
  created () {
    if (this.update) {
      // Firebase seems to store a Date() as a timestamp. Have to re-translate it for DatePicker eachtime
      console.log(' update! ', this.exercise.date.toDate(), new Date())
      this.exercise.date = this.exercise.date.toDate()
    } else {
      this.exercise = {
        date: new Date(),
        hours: 1,
        minutes: 30,
        text: null,
        type: null,
        userId: this.email_user
      }
    }
  }
}
</script>

<style scoped>
.date-input {
  width: 130px;
}

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

.time-input {
  text-align: right;
}

.time-input > * {
  width: 2rem;
  text-align: right;
  /* border-style: none; */
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