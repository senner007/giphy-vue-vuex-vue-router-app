<template>
  <span>
    <figure>
        <div v-if="!isSingle" class="divCaption">{{!isBroken ? captionText : "Image is Broken"}}</div>
        <img v-show="!isBroken && !imageShown" class="giphy-image" src="../../assets/loader.gif">
        <span v-images-loaded="imageOnLoad" >
          <img ref="image" class="giphy-image remote" v-bind:class="{ scale : isSingle }" v-show="imageShown" :src="srcUrl" >
        </span>
        <img class="giphy-image"  v-show="isBroken" src="../../assets/broken_giphy.gif"> 
    </figure>
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";

  interface ILoadedInstance {
      images : Array<any>;
      isBroken : boolean;
  }

  @Component
  export default class Giphy extends Vue {

      @Prop() public srcUrl!: string;
      @Prop() private captionText!: string;
      @Prop() private isSingle!: boolean;

      mounted () : void {
          console.log(this.isSingle);
      }
      imageShown : boolean = false;
      isBroken : boolean = false;
      imageOnLoad(inst : ILoadedInstance): void {
          if (inst.images[0].isLoaded) {
              this.imageShown = true;
          } else {
              this.isBroken = true;
          }
          this.$emit('imageDone', inst.images[0].img.src);
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .giphy-image {
    margin-top: 10px;
    border: 1px solid grey;
    max-width: 100%;
  }

  .scale {
    margin-top: 50px;
    transform: scale(1.5)
  }

  .divCaption {
    display : inline;
    position : absolute;
    color : black;
    background: white;
    border : 2px solid black;
    margin-left : -10px;
    margin-top : -10px;
    border-radius : 10px 0px 10px 0px;
    padding: 5px 8px;
  }

  figure {
    display: inline-block;
    margin: 0;
  }
</style>