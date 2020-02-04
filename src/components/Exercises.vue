<template>
  <div class="container-fluid">
    <div class="row firstRow">
      <selector-radio class="col" :all="['nov', 'jan']" :selected="selectedMonth" @clicked="changeExercises"></selector-radio>
      <div class="col">
        <a target="_blank" rel="noopener noreferrer" :href="exercises.first_read" class="btn btn-info" role="button">Extra info - {{getFullMonth(selectedMonth)}}</a>
      </div>
    </div>

    <div class="row" >
      <div
        v-for="exercise in exercises.exercises"
        :key="exercise.name"
        class="col-sm-4"
      >
        <div :class="'card ' + getColor(exercise)">
          <div class="card-body">
            <h5 class="card-title">{{ exercise.name }}</h5>
            <p class="card-text">
              {{ exercise.remark }}
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                :src="exercise.video"
                allowfullscreen
              ></iframe>
            </div>
            <div class="row">
              <div class="reps_sets col">
                <p style="font-weight: bold;"> {{ exercise.type }} </p>
              </div>
            
              <div class="reps_sets col">
                {{ exercise.reps }}
                <i class="material-icons">loop</i>
                
              </div>
              <div class="reps_sets col">
                {{ exercise.sets }}
                <i class="material-icons">clear</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorRadio from '../elements/SelectorRadio.vue'
import jan from '../../static/tjeerd_jan.json'
import nov from '../../static/tjeerd_nov.json'

export default {
  name: 'exersices',
  components: {
    SelectorRadio
  },
  data () {
    return {
      exercises: jan,
      nov,
      jan,
      selectedMonth: 'jan',
      selectedView: 'exercises'
    }
  },
  methods: {
    getColor (exercise) {
      return exercise.type === 'Beenspieren'
        ? 'red'
        : exercise.type === 'Bovenlichaam'
          ? 'white'
          : 'blue'
    },
    changeExercises (value) {
      console.log('jan', value === 'jan')
      this.exercises = value === 'jan' ? this.jan : this.nov
      this.selectedMonth = value
    },
    changeView (value) {
      this.selectedView = value
    },
    getFullMonth (short) {
      return short === 'jan' ? 'januari' : 'november'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.material-icons {
  vertical-align: bottom;
}
.container-fluid {
  background-color: white;
}
.reps_sets {
  /* border-style: solid; */
  /* border-color: grey; */
  /* border-radius:15px;
  border-width: thin; */
  padding: 1rem;
  vertical-align: center;
}

.red {
  background-color: #AE1C28;
  /* color: white; */
}

.white {
  background-color: white;
}

.blue {
  background-color: #21468B;
  /* color: white; */
}
</style>
