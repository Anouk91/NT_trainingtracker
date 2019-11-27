<template>
  <div id="app">
    <header>
      <span>NT training trackr</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <span> menu here </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
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
