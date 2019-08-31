import Vue from "vue";
import Vuex from "vuex";

import API_KEY from "./assets/api_key";

export interface IImagesMeta {
  images : {
    fixed_height : {
      url : string;
    };
  };
}

Vue.use(Vuex);

interface IState {
  urls : Array<string>;
  query : string;
}

export default new Vuex.Store({
  state: {
    urls : [],
    query: ""
  },
  getters : {
    getUrls (state : IState): Array<string> | null {
      return state.urls;
    }
  },
  mutations: {
    addUrls (state : IState, urls : Array<string>): void {
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
        commit("addUrls", urls.data.map((v : IImagesMeta) => {
          return v.images.fixed_height.url;
        }));
        commit("setQuery", options.giphy);
    }
  }
});
