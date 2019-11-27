<template>
  <div>
    <main>
      <router-view />
    </main>
    <footer>
  <!-- Image and text -->
  <b-navbar toggleable="lg" type="dark" variant="info" >
      <!-- <img src="../static/img/nederland-orange.jpeg" class="d-inline-block align-top" alt="Kitten"> -->
      <b-navbar-brand :to="'/'" active>Home</b-navbar-brand>
      <b-navbar-nav>
      <b-nav-item :to="'/user'">User</b-nav-item>
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