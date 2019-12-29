import { Component, Prop, Vue, Watch } from "vue-property-decorator";

interface RouteObject {
    params : {
        query : string;
    };
}

@Component
export default class GiphySearch extends Vue {
    @Prop() private query!: string;
    @Prop() private queryId!: number;

    inputField : string = "";
    amount : number = 50;

    pushRoute(): void {
        this.$router.push({ path: "/" + this.inputField });
    }

    getGiphys (name : string = this.inputField): void {
        (this.$refs.inputSearch as HTMLInputElement).focus();
        this.$store.dispatch("commitUrls", {giphy: name, limit : this.amount});
    }

    @Watch("$route")
    onRouteChange(val : RouteObject, oldVal : RouteObject): void {
        this.inputField = "";
        this.getGiphys(val.params.query);
    }

}