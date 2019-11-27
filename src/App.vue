<template>
  <div>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>
    <main>
      <router-view />
    </main>
    <footer>
      <span> menu here </span>
    </footer>
  </div>
</template>

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
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #000000;
  color: #ffffff;
  width: 100%;
}
</style>

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
