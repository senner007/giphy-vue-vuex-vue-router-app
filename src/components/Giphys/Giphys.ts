import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Giphy from "@/components/Giphy/Giphy.vue"; // @ is an alias to /src

export interface IImagesMeta {
  images : {
    fixed_height : {
      url : string;
    };
  };
}

@Component({
  components: {
    Giphy
  }
})
export default class Giphys extends Vue {
  @Prop() private queryId!: number;
  @Prop() private query!: string;

  giphyUrls : string[] = [];
  imagesLoadedMessage : string = "";
  totalAmount : number = isNaN(this.queryId) ? 50 : 1;
  amount : number = 0;
  srcUrlSingle : string = "";

  imageDone(): void{
     this.amount ++;
    if (this.amount === this.totalAmount) {
      this.imagesLoadedMessage = "Loaded!";
    } else {
      this.imagesLoadedMessage = "Loading...";
      if (this.amount % 4 === 0) {
        this.displayUrls();
      }
    }
  }

  get getUrls(): Array<IImagesMeta> {
    return this.$store.getters.getUrls;
  }

  displayUrls(result : Array<IImagesMeta> = this.getUrls): void {
    if (result.length < 1) {
      this.imagesLoadedMessage = "Nothing found";
      return;
    }
    this.$nextTick(() => {
      if (isNaN(this.queryId)) {
        for (let i : number = this.amount; i < this.amount + 4; i++) {
          let element : IImagesMeta = result[i];
          if (!element) {
            this.totalAmount = result.length;
            return; // if for instance there are 27 and not 50
          }
          this.giphyUrls.push(element.images.fixed_height.url);
        }
      } else {
          this.srcUrlSingle = result[this.queryId -1].images.fixed_height.url;
      }
    });
  }

  @Watch("getUrls")
  onUrlsChange(val : IImagesMeta[], oldVal : IImagesMeta[] | Object):  void {
    this.amount = 0;
    this.giphyUrls = [];
    this.displayUrls(val);
  }
}