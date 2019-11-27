<template>
  <b-row>
    <b-col cols='12'>
      <h2>
        Excersises
      </h2>

      <b-table  hover 
      :items="exercises"
      :fields="fields"
      :head-variant="light"
      :bordered="true"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
      :table-variant="secondary"

      >
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      sortBy: 'date',
      sortDesc: false,
      fields: [

        { key: 'date', sortable: true },
        { key: 'type', sortable: false },
        { key: 'name', sortable: true },
        { key: 'minutes', sortable: true }
      ],
      exercises: [
        { type: 'daily', date: '27-11-2019', name: 'legs', minutes: 40 },
        { type: 'daily', date: '26-11-2019', name: 'legs', minutes: 35 },
        { type: 'training', date: '27-11-2019', name: 'AUC', minutes: 90 },
        { type: 'training', date: '25-11-2019', name: 'goalti', minutes: 90 },
        { type: 'training', date: '27-11-2019', name: 'UfO', minutes: 90 }
      ],
      errors: []
    }
  }
}
</script>
