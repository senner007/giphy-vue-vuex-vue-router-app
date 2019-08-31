<template>
  <div id="giphy-list">
    <h1>/{{ query }}{{queryId ? "/" + queryId : "" }}</h1>
    <h1 v-if="isNaN(queryId)">{{ imagesLoadedMessage }}</h1>
      <div v-if="isNaN(queryId)">
        <span class="giphy-item" v-for="(url, index) in giphyUrls" :key="index"> 
        <router-link :to="'/' + $store.getters.getQuery + '/' + (index +1)" >
          <Giphy @imageDone='imageDone' :captionText="$store.getters.getQuery +  ' ' + (index + 1).toString()" :srcUrl="url" />
        </router-link>
        </span> 
      </div>
     <div v-else>
        <Giphy v-if="srcUrlSingle != ''" :captionText="query +  ' ' + (queryId).toString()" :srcUrl="srcUrlSingle"/>
      </div> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Giphy from "@/components/Giphy/Giphy.vue"; // @ is an alias to /src
import Throttle from "./helpers/Throttle"

@Component({
  components: {
    Giphy
  }
})
export default class GiphyList extends Vue {
  @Prop() private queryId!: number;
  @Prop() private query!: string;

  giphyUrls : string[] = [];
  imagesLoadedMessage : string = "";
  throttle! : Throttle<string>;

  imageDone(): void{
    this.throttle.increase();
    this.imagesLoadedMessage = this.throttle.isDone ? "Done!" : "Fetching...";
  }

  get getUrls(): Array<string> {
    return this.$store.getters.getUrls;
  }

  get srcUrlSingle() : string {
    if (!this.getUrls.length) return "";
    return this.getUrls[Number(this.$route.params.id) -1];
  }

  @Watch("getUrls")
  onUrlsChange(val : string[], oldVal : string[] | Object):  void {

    this.giphyUrls = [];
    this.$nextTick(() => {
      if (isNaN(this.queryId)) {
      this.throttle = new Throttle<string>(val, this.giphyUrls)
     }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #giphy-list {
    margin: 20px;
  }

  .giphy-item {
    margin: 8px; 
  }
  
</style>