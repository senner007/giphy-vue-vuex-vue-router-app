<template>
  <div>
    <GiphySearch :query=$route.params.query />    
    <Giphys :queryId=$route.params.id :query=$route.params.query />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Giphys from "@/components/Giphys/Giphys"; // @ is an alias to /src

import GiphySearch from "@/components/GiphySearch/GiphySearch"; // @ is an alias to /src

@Component({
  components: {
    GiphySearch,
    Giphys
  }
})
export default class Query extends Vue {}
</script>