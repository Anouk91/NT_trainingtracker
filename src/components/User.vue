<template>
  <b-row>
    <b-col cols='12'>
      <h2>
        Excersises
      </h2>

      <b-table striped hover :items="exercises">
        <template slot='actions' scope='row'>
          <b-btn size='sm' @click.stop='details(row.item)'>Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      exercises: [
        {
          dailies: [
            { date: '27-11-2019', name: 'legs', minutes: '35' },
            { date: '27-11-2019', name: 'legs', minutes: '35' }
          ],
          training: 2
        }
      ],
      errors: []
    }
  }
}
</script>
