<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="exercise in dailies"
        :key="exercise.name"
        class="col-sm-4"
        style="padding-bottom: 1.5rem"
      >
        <div class="card">
          <div :class="'card-body' + getColor(exercise)">
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
                <i class="fa fa-times"></i>
              </div>
              <div class="reps_sets col">
                {{ exercise.sets }}
                <i class="fa fa-refresh"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'hello',
  data () {
    return {
      dailies: []
    }
  },
  firestore: {
    dailies: db.collection('dailies').orderBy('type')
  },
  methods: {
    getColor (exercise) {
      return exercise.type === 'Beenspieren'
        ? 'bg-danger'
        : exercise.type === 'Bovenlichaam'
          ? 'bg-light'
          : 'bg-primary'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reps_sets {
  /* border-style: solid; */
  /* border-color: grey; */
  /* border-radius:15px;
  border-width: thin; */
  padding: 1rem;
  vertical-align: center;
}

</style>
