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
      userId: "Start"
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
</style>
