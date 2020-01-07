<template>
  <div class="col-md">
    <div class="card dashboard-card">
    <div class="card-body">
      <h3> Top {{amountOfTop}} - wk {{currentWeekNum}}</h3>
      <div v-for="(player,i) in topThreeOfTheWeek()" :key="i" style="display: inline;">
        <div class="flex">
          <div class="color rank"> {{i + 1 }} </div>
          <div class="name"> {{player.username}}</div>
          <div class="color"> {{player.count}}x</div>
          <div class="time"> {{player.hours}}u <br> {{player.minutes}}m</div>
        </div>
      </div>
      <div class="total"> Totaal deze week <b> {{exercisesThisWeek.length}} </b> </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'top3',
  props: {
    exercises: {type: Array},
    members: {type: Array},
    amountOfTop: {type: Number}
  },
  methods: {
    topThreeOfTheWeek () {
      const orderedById = [] // [{userId, count}]
      if ((this.exercises.length !== 0) && this.members.length !== 0) {
        this.exercisesThisWeek.forEach(e => {
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
        }).splice(0, this.amountOfTop)
      }
    }
  },
  computed: {
    currentWeekNum: function () {
      return moment(new Date()).isoWeekday(1).format('w')
    },
    exercisesThisWeek () {
      if (this.exercises !== 0) return this.exercises.filter(e => this.currentWeekNum === moment.unix(e.date.seconds).isoWeekday(1).format('w'))
      else return 0
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

.rank {
  font-size: 2rem;
  text-align: left;
}

.name {
  width: 170px;
}

.time {
  width: 50px;
}

.total {
  text-align: end;
  padding-right: .5rem;
}
</style>
