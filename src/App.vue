<template>
  <div id="app">
     <GiphySearch :query=$route.params.query :queryId=$route.params.id />    
    <GiphyList :queryId=$route.params.id :query=$route.params.query />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GiphyList from "@/components/GiphyList/GiphyList.vue"; // @ is an alias to /src
import GiphySearch from "@/components/GiphySearch/GiphySearch"; // @ is an alias to /src

@Component({
  components: {
    GiphySearch,
    GiphyList
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0rem 0.5rem;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
