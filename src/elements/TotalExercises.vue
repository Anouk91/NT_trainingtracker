<template>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h3> Total Excersises</h3>
        <h2 class="color big"> {{exercises.length}} </h2>
      </div>
    </div>
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
.big {
  font-size: 5rem;
}
</style>
