<template>
  <div>
    <div style=" display: inline-block;" v-for="(version, i) in all" :key="i">
      <div class="col-sm btn-team">
        <div :class="isActive(version, i)" v-on:click="change(version)" @click="$emit('clicked', selectedType)">{{version}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selector-radio',
  props: {
    selected: { type: String },
    all: { type: Array }
  },
  data () {
    return {
      selectedType: this.selected
    }
  },
  methods: {
    isActive (obj, i) {
      var styleClass = obj === this.selectedType ? 'active' : ''
      if (i === 0) styleClass += ' left'
      if (i === this.all.length - 1) styleClass += ' right'
      console.log(styleClass)
      return styleClass
    },
    change (type) {
      console.log('changing!', type)
      this.selectedType = type
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
  font-size: 14px;
  padding: .4rem;
  color: white;
  background-color: #f28a26;
  border-bottom: solid;
  border-bottom-color: white;
  border-top: solid;
  border-top-color: white;
  cursor: pointer;
}
.active {
  background-color: #ec5d22;
  font-weight: bold;
}
.left {
  border-radius: 10px 0px 0px 10px;
  border-left-style: solid;
  border-left-color: white;
}

.right {
  border-radius: 0px 10px 10px 0px;
  border-right-style: solid;
  border-right-color: white;
}
</style>