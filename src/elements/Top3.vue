<template>
  <div class="col-md">
    <div class="card dashboard-card">
    <div class="card-body">
      <h3> Top 3 van week {{currentWeekNum}}</h3>
      <div v-for="(player,i) in topThreeOfTheWeek()" :key="i" style="display: inline;">
        <div class="flex">
          <div class="color rank"> {{i +1 }} </div>
          <div class="name"> {{player.username}}</div>
          <div> {{player.count}}x</div>
          <div> {{player.hours}}u {{player.minutes}}m</div>
        </div>
      </div>
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
    members: {type: Array}
  },
  methods: {
    topThreeOfTheWeek () {
      const orderedById = [] // [{userId, count}]
      if ((this.exercises.length !== 0) && this.members.length !== 0) {
        const exercisesThisWeek = this.exercises.filter(e => this.currentWeekNum === moment.unix(e.date.seconds).isoWeekday(1).format('w'))

        exercisesThisWeek.forEach(e => {
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
          console.log(u.username, 'hour', u.hours, '\nminutes', u.minutes, '\nextra hours', extraHours, '\nmin left', u.minutes % 60)
          u.hours += extraHours
          u.minutes = u.minutes % 60
        })
        return orderedById.sort((a, b) => { return b.count - a.count }).splice(0, 3)
      }
    }
  },
  computed: {
    currentWeekNum: function () {
      return moment(new Date()).isoWeekday(1).format('w')
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rank {
  font-size: 2rem;
  text-align: left;
}

</style>
