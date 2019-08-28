import { createLocalVue, shallowMount } from "@vue/test-utils";
import Giphy from "@/components/Giphy/Giphy.vue";
import imagesLoaded from "vue-images-loaded";
const puppeteer = require('puppeteer');


describe("Giphy.vue", () => {
  it("renders props.srcUrl when passed", () => {
    const srcUrl = "http://localhost/image.jpg";
    const localVue = createLocalVue()
    localVue.directive("images-loaded", imagesLoaded);
    const wrapper = shallowMount(Giphy, {
      localVue,
      propsData: { srcUrl }
    });
    var image : HTMLImageElement = wrapper.vm.$refs.image as HTMLImageElement;
    expect(image.src).toMatch(srcUrl);
  });
});



describe("Giphy.vue", () => {
  it("renders the input field in Giphy.vue", () => {
    function run () {
        return new Promise(async (resolve, reject) => {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://nielshtg.dk');
                await page.waitForSelector('.giphy-search > input');
                let inputValue : string | null = await page.evaluate(() => {
                    var input : HTMLInputElement | null = document.querySelector('.giphy-search > input');
                    if (input && "value" in input) {
                      input.value = "bla";
                      return input.value;
                    }
                    return null;
                });
                browser.close();
                return resolve(inputValue);
            } catch (e) {
                return reject(e);
            }
        })
    }
    run()
    .then(inputValue => 
      expect(inputValue).toMatch("bla"))
    .catch(console.error);
  });
});
