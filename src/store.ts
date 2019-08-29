import Vue from "vue";
import Vuex from "vuex";
import IImagesMeta from "./components/GiphyList/GiphyList.vue";
import API_KEY from "./assets/api_key";


Vue.use(Vuex);

interface IState {
  urls : Array<IImagesMeta>;
  query : string;
}

export default new Vuex.Store({
  state: {
    urls : [],
    query: ""
  },
  getters : {
    getUrls (state : IState): Array<IImagesMeta> | null {
      return state.urls;
    },
    getQuery (state : IState): string {
      return state.query;
    }
  },
  mutations: {
    addUrls (state : IState, urls : Array<IImagesMeta>): void {
      state.urls = urls;
    },
    setQuery (state : IState, query : string): void {
      state.query = query;
    }
  },
  actions: {
    async commitUrls({commit}: any, options : {giphy: string; limit : number;}): Promise<any> {

      if (this.state.query === options.giphy) {
        commit("addUrls", this.state.urls.slice(0));
        return;
      }
      var url : string = "https://api.giphy.com/v1/gifs/search";
      var urls : any =
        await fetch(`${url}?q=${options.giphy}&api_key=${API_KEY.key}&limit=${options.limit}`)
        .then(res => res.json())
        .catch(error => console.error(error));
        commit("addUrls", urls.data);
        commit("setQuery", options.giphy);
     
    }
  }
});
