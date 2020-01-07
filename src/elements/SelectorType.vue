<template>
  <div>
    <div style=" display: inline-block;" v-for="(workoutType, i) in workoutTypes" :key="i">
  <div class="col-sm btn-team">
      <div :class="isActive(workoutType.short, i)" v-on:click="addRemove(workoutType.short)" @click="$emit('clicked', selectedArray)">{{workoutType.short}}</div>
      <!-- <div :class="isActive('training')" v-on:click="addRemove('training')">training</div>
      <div :class="'right' + isActive('fitness')" v-on:click="addRemove('fitness')">fitness</div> -->
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selector-type',
  props: {selectedTypes: {type: Array}},
  data () {
    return {
      selectedArray: this.selectedTypes,
      workoutTypes: require(`../../static/workout_types.json`)
    }
  },
  methods: {
    isActive (type, i) {
      var styleClass = this.exists(type) ? 'active' : ''
      if (i === 0) styleClass += ' left'
      if (i === this.workoutTypes.length - 1) styleClass += ' right'
      return styleClass
    },
    addRemove (type) {
      if (this.exists(type)) {
        this.arrayRemove(type)
      } else this.selectedArray.push(type)
    },
    exists (type) {
      // console.log(this.selectedArray, this.selectedArray.find(t => { return t === type }))
      if (this.selectedArray.find(t => { return t === type })) return true
      else return false
    },
    arrayRemove (value) {
      this.selectedArray = this.selectedArray.filter(e => { return e !== value })
    }
  }
}
</script>
<style scoped>
.btn-team {
  font-size: 0;
  /* margin-bottom: .5rem; */
  margin: 0;
  padding: 0;
}
.btn-team > * {
  font-size: 10px;
  padding: .4rem;
  color: white;
  background-color: #f28a26;
  cursor: pointer;
}
.active {
  background-color: #ec5d22;
}
.left {
  border-radius: 10px 0px 0px 10px;
}

.right {
  border-radius: 0px 10px 10px 0px;
}
</style>