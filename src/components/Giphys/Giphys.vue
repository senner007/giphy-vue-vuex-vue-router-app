<template>
  <div id="giphys">
    <h1>/{{ query }}{{queryId ? "/" + queryId : "" }}</h1>
    <h1 v-if="isNaN(queryId)">{{ imagesLoadedMessage }}</h1>
      <div v-if="isNaN(queryId)">
        <span class="giphy-item" v-for="(element, index) in giphyUrls" :key="index"> 
        <router-link :to="'/' + $store.getters.getQuery + '/' + (index +1)" >
          <Giphy @imageDone='imageDone' :captionText="$store.getters.getQuery +  ' ' + (index + 1).toString()" :srcUrl="element" />
        </router-link>
        </span> 
      </div>
     <div v-else>
        <Giphy v-if="srcUrlSingle != ''" @imageDone='imageDone' :captionText="query +  ' ' + (queryId).toString()" :srcUrl="srcUrlSingle"/>
      </div> 
  </div>
</template>

<script lang="ts" src="./Giphys.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #giphys {
    margin: 20px;
  }

  .giphy-item {
    margin: 8px; 
  }
  
</style>