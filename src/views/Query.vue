<template>
  <div>
    <GiphySearch :query=$route.params.query />    
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
export default class Query extends Vue {}
</script>