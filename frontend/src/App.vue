<template>
  <header-component></header-component>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  data() {
    return {
      userId: ""
    }
  },
  components: {
    HeaderComponent
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
    display: flex;
    justify-content: right;
    position: absolute;
    top: 15px;
    right: 0px;
    background-color: white;
    width: 100%;
}

a {
  margin: 5px 5px;
  text-decoration: none;
  color: #FD2D01;
  padding: 10px
}

a:hover {
  background-color: aliceblue;
}

button {
    display: flex;
    justify-content: center;
    width: 40%;
    max-width: 250px;
    margin: 20px auto 0 auto;
    background-color: #FD2D01;
    color: #FFFFFF;
    border:  black solid 1px;
    border-radius: 15px;
}

button:hover {
    background-color: #b11f01;
}

</style>
