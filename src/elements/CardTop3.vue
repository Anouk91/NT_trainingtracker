<template>
  <div class="col-md">
    <div class="card dashboard-card ">
    <div class="card-body">
      <h3> Top - wk <input class="week-input" type="number" v-model.number="selectedWeek">
      
      </h3>
      <selector-type :selectedTypes="selectedArray" @clicked="filterExercises"> </selector-type>
      <div class="scroll">
      <div  v-for="(player,i) in topThreeOfTheWeek()" :key="i" style="display: inline;">
        <div class="flex">
          <div class="color rank"> {{i + 1 }} </div>
          <div class="name"> {{player.username}}</div>
          <div class="color"> {{player.count}}x</div>
          <div class="time"> {{player.hours}}u <br> {{player.minutes}}m</div>
        </div>
      </div>
      </div>
      <div class="total"> Totaal deze week <b> {{filteredExercises.length}} </b> </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SelectorType from './SelectorType.vue'

export default {
  name: 'CardTop3',
  components: {
    SelectorType
  },
  props: {
    exercises: {type: Array},
    members: {type: Array}
  },
  data () {
    return {
      selectedWeek: moment(new Date()).isoWeekday(1).format('w'),
      selectedArray: require(`../../static/workout_types.json`).map(w => { return w.name }).slice(0, -1)
    }
  },
  methods: {
    topThreeOfTheWeek () {
      const orderedById = [] // [{userId, count}]
      if ((this.exercises.length !== 0) && this.members.length !== 0) {
        this.filteredExercises.forEach(e => {
          const player = orderedById.find(p => { return e.userId === p.userId })

          if (!player) {
            const playerInfo = this.members.find(m => { return m.email_address === e.userId })
            orderedById.push({userId: e.userId, username: `${playerInfo.firstname} ${playerInfo.lastname}`, count: 1, hours: e.hours, minutes: Number(e.minutes)})
          } else {
            player.count++
            player.hours += e.hours
            player.minutes += e.minutes
          }
        })
        orderedById.forEach(u => {
          const extraHours = Math.floor(u.minutes / 60)
          u.hours += extraHours
          u.minutes = u.minutes % 60
        })
        return orderedById.sort((a, b) => {
          if (b.count !== a.count) return b.count - a.count
          if (b.hours !== a.hours) return b.hours - a.hours
          else return b.minutes - a.minutes
        })
      }
    },
    filterExercises (value) {
      this.selectedArray = value
    }
  },
  computed: {

    exercisesThisWeek () {
      if (this.exercises !== 0) {
        return this.exercises.filter(e => `${this.selectedWeek}` === moment.unix(e.date.seconds).isoWeekday(1).format('w'))
      } else return 0
    },
    filteredExercises () {
      var filtered = []
      if (this.selectedArray.length !== 0) {
        this.exercisesThisWeek.forEach(e => {
          this.selectedArray.forEach(t => {
            if (e.type.name === t) {
              filtered.push(e)
            }
          })
        })
        return filtered
      } else return []
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .2rem;
  padding-left: .5rem;
  padding-right: .5rem;
  border: 1px solid  var(--primary-color);
  border-radius: 5px;
}

.card-body {
  padding: 0; 
}
.rank {
  font-size: 2rem;
  text-align: left;
}

.week-input {
  width: 40px;
  background-color: var(--primary-color);
  color: white;
  border: auto;
  border-radius: 5px;
  align-items: center;
}

.name {
  width: 170px;
}

.time {
  width: 50px;
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
}

.total {
  text-align: end;
  padding-right: .5rem;
}
</style>
