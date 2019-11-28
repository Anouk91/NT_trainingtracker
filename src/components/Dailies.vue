<template>
  <div class="container-fluid">
    <div v-for="exercise in lowerBody" :key="exercise.name">
      <div class="card" style="width: 18rem;">
        <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Leeuw"> -->
        <div class="card-body">
          <h5 class="card-title">{{ exercise.name }}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      lowerBody: [
        {
          name: 'Single Leg deadlift',
          sets: 3,
          reps: '8-12 per leg',
          video:
            'https://drive.google.com/file/d/1dNvnhstl8HcBvPAeMFum6yprPGyqY2jS/view?usp=sharing',
          opmerking:
            'Belangrijk dat de buiging uit het heupgewricht komt en niet uit de rug; die moet recht blijven! Hou de heupen ook recht naast elkaar (linkerkant zelfde hoogte als rechterkant)'
        },
        {
          name: 'Box jumps',
          sets: '3/4',
          reps: 10,
          video:
            'https://drive.google.com/file/d/1p55Ga_P8E574UiXTDsszwTf9iilsxqbs/view?usp=sharing',
          opmerking: null
        },
        {
          name: 'Step up',
          sets: 3,
          reps: 12,
          video:
            'https://drive.google.com/file/d/105yYsEbfo_MqvBHDJRyGhFzmUEPsEGje/view?usp=sharing',
          opmerking: null
        },
        {
          name: 'Crab',
          sets: 3,
          reps: '10-15',
          video:
            'https://drive.google.com/file/d/1Wklq1J5LNZbYxvZmnBJBiXHgHSLkBN8R/view?usp=sharing',
          opmerking: null
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
