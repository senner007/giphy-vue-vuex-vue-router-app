<template>
  <div class="giphy-search">
    <h1>Search for giphys!</h1>
    <h2 v-if="query">/{{ query }}{{queryId ? `/${queryId}` : "" }}</h2>
    <input ref="inputSearch" v-model="inputField" type="text" v-on:keyup.enter="pushRoute">
    <button @click="pushRoute">Fetch</button>
  </div>
</template>

<script lang="ts" src="./GiphySearch.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
