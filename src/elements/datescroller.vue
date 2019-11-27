<template>
  <div class="scrollmenu">
    <div
    class="dayitem"
    v-for="date in datelist"
    v-bind:class="{active: date === selected_day}">
      <div style="height: 100%; padding: 7px;">
        <span style="font-size: 1.3em; font-weight: 600;">{{date.toLocaleDateString('nl-NL', {weekday: "short"})}}</span><br>
        <span style="font-size: 1em; font-weight: 200;">{{date.getDate()}} {{date.toLocaleDateString('nl-NL', {month: "short"}).slice(0,-1)}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'datescroller',
  props: {
    datelist: Array
  },
  data () {
    return {
      selected_day: Date('27-11-2019')
    }
  }
}
</script>

<style>

  div.scrollmenu {
    background-color: #000;
    overflow: auto;
    white-space: nowrap;
    max-width: 100%;
  }

  div.scrollmenu div.dayitem {
    display: inline-block;
    width: 25%;
    color: white;
    height: 60px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
  }

  div.scrollmenu .active {
    border-bottom: 5px solid white;

  }
</style>
