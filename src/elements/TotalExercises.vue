<template>
  <div class="card">
    <h3> Total Excersises</h3>
    <h2 class="color big"> {{exercises.length}} </h2>
  </div>
</template>


<script>

export default {
  name: 'total-exercises',
  props: {
    exercises: {type: Array}
  }
}
</script>

<style scoped>
.color {
  color: #ff6600; 
}

.card {
  background-color:#fff0e6;
  margin-bottom: 2rem;
  padding: 1rem;
  justify-content: center;
}

.big {
  font-size: 5rem;
}
</style>
