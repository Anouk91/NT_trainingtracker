<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="exercise in lowerBody" :key="exercise.name" class="col-sm-4" style="padding-bottom: 1.5rem">

         <div class="card">
        <!--  <div class="card-header">
          https://codepen.io/cristinaconacel/pen/ePVMME?editors=1000
            <ul class="nav nav-tabs card-header-tabs"  :id="exercise.name" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#home" role="tab" aria-controls="home" aria-selected="true">Explanation</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
              </li>
            </ul>
          </div> -->

          <div class="card-body">
            <!-- <div class="tab-content"> -->
              <!-- <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> -->
                <h5 class="card-title">{{ exercise.name }}</h5>
                <p class="card-text">
                  {{exercise.description}}
                </p>
                <div class="row">
                  <span class="reps_sets col">
                    {{exercise.reps}}
                    <i class="fa fa-times"></i>
                  </span>
                  <span class="reps_sets col">
                    {{exercise.sets}}
                    <i class="fa fa-refresh"></i>
                </span>

              <!-- </div>
              <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">Linkie linkie</div> -->
              <!-- </div> -->
              </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      lowerBody: [
        {
          name: 'Single Leg deadlift',
          sets: 3,
          reps: '8-12 per leg',
          video:
            'https://drive.google.com/file/d/1dNvnhstl8HcBvPAeMFum6yprPGyqY2jS/view?usp=sharing',
          description:
            'Belangrijk dat de buiging uit het heupgewricht komt en niet uit de rug; die moet recht blijven! Hou de heupen ook recht naast elkaar (linkerkant zelfde hoogte als rechterkant)'
        },
        {
          name: 'Box jumps',
          sets: '3/4',
          reps: 10,
          video:
            'https://drive.google.com/file/d/1p55Ga_P8E574UiXTDsszwTf9iilsxqbs/view?usp=sharing',
          description: null
        },
        {
          name: 'Step up',
          sets: 3,
          reps: 12,
          video:
            'https://drive.google.com/file/d/105yYsEbfo_MqvBHDJRyGhFzmUEPsEGje/view?usp=sharing',
          description: null
        },
        {
          name: 'Crab',
          sets: 3,
          reps: '10-15',
          video:
            'https://drive.google.com/file/d/1Wklq1J5LNZbYxvZmnBJBiXHgHSLkBN8R/view?usp=sharing',
          description: null
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.reps_sets {
  border-block-color: black;
}

</style>
