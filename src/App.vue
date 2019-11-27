<template>
  <div>
    <main>
      <router-view />
    </main>
    <footer>
  <!-- Image and text -->
  <b-navbar variant="dark" type="light">
    <b-navbar-brand > 
      <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Kitten"> -->
      <b-link :to="'/'">Home</b-link>
        
    </b-navbar-brand>
    <!-- <b-nav-item > -->
      <b-link :to="'/user'">User</b-link>

    <!-- </b-nav-item> -->
  </b-navbar>
      <span> 
      <!-- <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul> -->
    </span>
    </footer>
  </div>
</template>


<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Home',
        to: '/'
      },
      {
        name: 'User',
        to: '/user'
      }
    ]
  })
}
</script>


<style scoped>
ul {
  list-style: none;
  display: flex;
  padding: 0;
}
li {
  padding: 5px 15px 5px 0;
}
li a {
  text-decoration: none;
  color: black;
}

main {
  text-align: center;
  margin-top: 56px;
  margin-bottom: 56px;
}

header {
  position: fixed;
  top: 0px;
  width: 100%;
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #000000;
  color: #ffffff;
}
footer {
  position: fixed;
  bottom: 0px;
  /* height: 56px; */
  /* padding: 0 16px 0 24px; */
  /* background-color: #ffa500;; */
  width: 100%;
}
</style>