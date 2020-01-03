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
                <Datepicker :monday-first="true" :language="nl" class="col-5 date-input" v-model="dateFormat"></Datepicker> 
                <div class="col-7 time-input">
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
              v-if="update"
              class="modal-default-button" @click="$emit('close') && deleteExercise()" 
              variant="danger">
                Verwijderen 
              </b-button>
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
import {nl} from 'vuejs-datepicker/dist/locale'
import firebase from 'firebase'

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
      workout_types: [
        {'id': 'XUFysn6P2xn4SnitKINr', 'icon': 'group', 'name': 'Team Training'},
        {'id': 'osFdKyLd5g09d5LiDjTz', 'icon': 'directions_run', 'name': 'Endurance'},
        {'id': 'g7efLzxKLb04pv6Kf3Qc', 'icon': 'trip_origin', 'name': 'Throwing'},
        {'id': 'mxDAAZSM0bPnYjz5HlqP', 'icon': 'fitness_center', 'name': 'Strength'}
        {'id': '2UqpbF01AVG6Z0Vw4Zte', 'icon': 'sports', 'name': 'Other'},
      ],
      nl: nl
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
    deleteExercise () {
      var docRef = db.collection(`${this.team}_exercises`).doc(this.exercise.id)
      // console.log('docRef', docRef)
      docRef.delete()
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
    if (!this.update) {
      this.exercise = {
        date: firebase.firestore.Timestamp.now(),
        hours: 1,
        minutes: 30,
        text: null,
        type: null,
        userId: this.email_user
      }
    }
  },
  computed: {
    dateFormat: {
      set: function (value) {
        this.exercise.date = firebase.firestore.Timestamp.fromDate(value)
      },
      get: function () {
        return this.exercise.date.toDate()
      }
    }
  }
}
</script>

<style scoped>
.time-input {
  text-align: right;
}

.time-input > * {
  width: 1.5rem;
  text-align: right;
}

.minute {
  width: 3rem;
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  max-width: 400px;
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