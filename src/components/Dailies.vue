<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="exercise in Exercises"
        :key="exercise.name"
        class="col-sm-4"
        style="padding-bottom: 1.5rem"
      >
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
              {{ exercise.remark }}
            </p>
                <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  :src="exercise.video"
                  allowfullscreen
                ></iframe>
              </div>
            <div class="row">
              <span class="reps_sets col">
                {{ exercise.reps }}
                <i class="fa fa-times"></i>
              </span>
              <span class="reps_sets col">
                {{ exercise.sets }}
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
      // lowerBody: [
      //   {
      //     name: 'Single Leg deadlift',
      //     sets: 3,
      //     reps: '8-12 per leg',
      //     video:
      //       'https://drive.google.com/file/d/1dNvnhstl8HcBvPAeMFum6yprPGyqY2jS/view?usp=sharing',
      //     description:
      //       'Belangrijk dat de buiging uit het heupgewricht komt en niet uit de rug; die moet recht blijven! Hou de heupen ook recht naast elkaar (linkerkant zelfde hoogte als rechterkant)'
      //   },
      //   {
      //     name: 'Box jumps',
      //     sets: '3/4',
      //     reps: 10,
      //     video:
      //       'https://drive.google.com/file/d/1p55Ga_P8E574UiXTDsszwTf9iilsxqbs/view?usp=sharing',
      //     description: null
      //   },
      //   {
      //     name: 'Step up',
      //     sets: 3,
      //     reps: 12,
      //     video:
      //       'https://drive.google.com/file/d/105yYsEbfo_MqvBHDJRyGhFzmUEPsEGje/view?usp=sharing',
      //     description: null
      //   },
      //   {
      //     name: 'Crab',
      //     sets: 3,
      //     reps: '10-15',
      //     video:
      //       'https://drive.google.com/file/d/1Wklq1J5LNZbYxvZmnBJBiXHgHSLkBN8R/view?usp=sharing',
      //     description: null
      //   }
      // ],
      Exercises: [
        {
          name: 'Bulgarian Split Squat',
          sets: 3,
          reps: '12 per been',
          video: 'https://www.youtube.com/embed/w4OUtEO27UM',
          remark:
            'Zorg dat je met de heupen naar achter en terug naar voren beweegt terwijl je omlaag buigt. Deze oefening kan zonder gewichtjes al pittig zijn, pak er anders wat dumbells bij',
          type: 'Beenspieren'
        },
        {
          name: 'Single Leg deadlift of single leg hip lift',
          sets: 3,
          reps: '12 per been',
          video: 'https://www.youtube.com/embed/jBSs_CgdwDs',
          remark:
            'Belangrijk dat de buiging uit het heupgewricht komt en niet uit de rug; die moet recht blijven! Hou de heupen ook recht naast elkaar (linkerkant zelfde hoogte als rechterkant)',
          type: 'Beenspieren'
        },
        {
          name: 'Calf raise',
          reps: 3,
          sets: '15 per been',
          video: 'https://www.youtube.com/embed/gwLzBJYoWlI',
          remark:
            'Hou je knieën constant gestrekt. Zet druk door je grote teen. Maar dan één been tegelijk. Help jezelf een beetje extra omhoog totdat je helemaal op het puntje van je tenen staat.',
          type: 'Beenspieren'
        },
        {
          name: 'Seated cable row',
          reps: 3,
          sets: 12,
          video: 'https://www.youtube.com/embed/dkv7tzJ7fMk',
          remark:
            'Zorg dat je je rug goed recht blijft houden. Ga niet extra naar achter leunen, maar hou de rug stil! Eerst schouders bij elkaar trekken, daarna pas met de ellebogen gaan bewegen.',
          type: 'Bovenlichaam'
        },
        {
          name: 'Front + Side raise',
          reps: 3,
          sets: 10,
          video: 'https://www.youtube.com/embed/RsATjkAiXWk',
          remark:
            'Ontspan de nek: hou de schouders laag. Zet spanning op buik en bilspieren om goed rechtop te blijven staan.',
          type: 'Bovenlichaam'
        },
        {
          name: 'Exorotatie met kabel/elastiek',
          reps: 3,
          sets: 12,
          video: 'https://www.youtube.com/embed/vMbxeDM7mW0',
          remark:
            'Doe een elastiek om een paal oid. Zorg dat de elleboog in de zij blijft staan aan het begin.Je kan deze oefening ook uitvoeren met de ellebogen op schouderhoogte, of alles ertussenin.',
          type: 'Bovenlichaam'
        },
        {
          name: 'Plank (eventueel extra instabiliteit)',
          reps: 3,
          sets: '30s',
          video: 'https://www.youtube.com/embed/TWpbe9nRySc',
          remark:
            'Trek je navel in en maak je rug bol (voor je gevoel). Extra instabiliteit kan komen uit het optillen van een been, een arm of allebei. Of door de oefening uit te voeren met de armen/benen op een Swiss ball of in een TRX. Experimenteer lekker',
          type: 'Buikspieren'
        },
        {
          name: 'Side plank',
          reps: 3,
          sets: '30s per kant',
          video: 'https://www.youtube.com/embed/K2VljzCC16g',
          remark:
            'Zorg dat je je heupen naar voren duwt en zowel je heupen en schouders in één lijn houdt. Extra moeilijkheid kan komen uit optillen van bovenste been',
          type: 'Buikspieren'
        },
        {
          name: 'Single leg leg raise + schuine crunch',
          reps: 3,
          sets: 16,
          video: 'https://www.youtube.com/embed/gSi8z1gIdC8',
          remark:
            'Hou de onderrug altijd op de grond gedrukt. Ga met tegenoverliggende arm richting het been dat je net hebt opgetild (linkerarm naar rechtervoet)',
          type: 'Buikspieren'
        },
        {
          name: 'Knieën intrekken naar borst',
          reps: 3,
          sets: 15,
          video:
            'https://drive.google.com/open?id=1hM-hWXXtqO3jBbXkKKYn5hlrSoospUIl',
          remark:
            'Lig op je rug met je knieën omhoog (knieën gebogen). Trek je heupen van de grond af. Duw eventueel je handen de grond in om jezelf een beetje extra omhoog te helpen',
          type: 'Buikspieren'
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
