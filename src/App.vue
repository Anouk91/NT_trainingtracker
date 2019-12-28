<template>
  <div class="background">
    <main>
      <router-view />
    </main>
    <footer>
  <!-- Image and text -->
  <b-navbar toggleable="lg" >
      <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Leeuw"> -->
      <b-navbar-brand :to="'/'" active>

      <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top lion" alt="Lion" >
      </b-navbar-brand>
      <b-navbar-nav v-for="link in links" :key="link.to">
      <b-nav-item :to="link.to">{{link.name}}</b-nav-item>
      </b-navbar-nav>

  </b-navbar>
    </footer>
  </div>
</template>


<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Dames',
        to: '/ndt'
      },
      {
        name: 'Mixed',
        to: '/nmt'
      },
      {
        name: 'Open',
        to: '/not'
      },
      {
        name: 'Gym',
        to: '/exercises'
      }
    ]
  })
}
</script>


<style>
:root {
  --primary-color: #ff6600;
  background-color: #ff6600;
}
.navbar {
  border-top: 1px solid  var(--primary-color);
  background-color: white;
}

.lion {
  -webkit-clip-path: circle(50% at 50% 50%); 
  clip-path: circle(50% at 50% 50%);
  width: 2rem;
  height: 2rem;
}

main {
  text-align: center;
  margin-bottom: 56px;
}
footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.card {
  margin: 1rem;
  justify-content: center;
  padding: 1rem;
}

/* .dashboard-card {
  background-color: #fff0e6;
} */
.background {
  background-color: var(--primary-color);
}
.color {
  color: var(--primary-color) 
}

.lastRow {
  padding-bottom: 1rem;
}


</style>