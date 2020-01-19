<template>
  <div>
    <div style=" display: inline-block;" v-for="(version, i) in all" :key="i">
  <div class="col-sm btn-team">
      <div :class="isActive(version, i)" v-on:click="addRemove(version)" @click="$emit('clicked', selectedArray)">{{version}}</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selector-version',
  props: {
    selectedTypes: { type: Array },
    all: { type: Array }
  },
  data () {
    return {
      selectedArray: this.selectedTypes
    }
  },
  methods: {
    isActive (type, i) {
      var styleClass = this.exists(type) ? 'active' : ''
      if (i === 0) styleClass += ' left'
      if (i === this.all.length - 1) styleClass += ' right'
      return styleClass
    },
    addRemove (type) {
      if (this.exists(type)) {
        this.arrayRemove(type)
      } else this.selectedArray.push(type)
    },
    exists (type) {
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
  font-size: 12px;
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