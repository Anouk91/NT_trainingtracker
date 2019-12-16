<template>
  <div>
    <main>
      <router-view />
    </main>
    <footer>
  <!-- Image and text -->
  <b-navbar toggleable="lg" type="dark" variant="info" >
      <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Leeuw"> -->
      <b-navbar-brand :to="'/'" active>

      <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top lion" alt="Lion" >
      NT Dashboard</b-navbar-brand>
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
        name: 'User',
        to: '/user'
      },
      {
        name: 'Dailies',
        to: '/dailies'
      }
    ]
  })
}
</script>


<style scoped>
.lion {
  -webkit-clip-path: circle(50% at 50% 50%); 
  clip-path: circle(50% at 50% 50%);
  width: 2rem;
  height: 2rem;
}

main {
  text-align: center;
  margin-top: 56px;
  margin-bottom: 56px;
}
/* 
header {
  position: fixed;
  top: 0px;
  width: 100%;
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #000000;
  color: #ffffff;
} */
footer {
  position: fixed;
  bottom: 0px;
  /* height: 56px; */
  /* padding: 0 16px 0 24px; */
  /* background-color: #ffa500;; */
  width: 100%;
}
</style>