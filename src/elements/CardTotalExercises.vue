<template>
  <div class="col">
    <div class="card dashboard-card">
      <div class="card-body">
        <h3> Trainingen Totaal</h3>
        <h2 class="color big"> {{exercises.length}} </h2>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'card-total-exercises',
  props: {
    exercises: {type: Array}
  }
}
</script>

<style scoped>
.big {
  font-size: 5rem;
}
</style>
