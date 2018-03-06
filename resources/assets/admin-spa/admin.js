import 'babel-polyfill';

import Vue from 'vue';
import Element from 'element-ui';
import router from './router/';
import store from './store/index.js';
import Admin from './admin.vue';
import locale from 'element-ui/lib/locale/lang/en';

import './axios.js';

Vue.use(Element, {locale});

window.site_url = 'www.toiletcubiclesonline.com';



import { mapActions, mapGetters } from 'vuex';
Vue.mixin({
  computed: {
    getSiteBaseURL(value) {
        return (process.env.NODE_ENV === 'development' ? process.env.MIX_LOCAL_URL : process.env.MIX_BUILD_URL) + '/'
    },
  }
});

import generateColors from './utils/color';
import objectAssign from 'object-assign';

const app = new Vue({
    router,
    mounted() {
      // setTimeout(function(){ this.changeColor(); }.bind(this), 2000);
    },
    created() {
        this.getIndexStyle()
            .then(function () {
                this.tasks.push({task: 1});
            }.bind(this));
        this.getSeparatedStyles()
            .then(function () {
              this.tasks.push({task: 2});
            }.bind(this));
    },
    el: '#app',
    store,
    render: h => h(Admin),
    data() {
      return {
          colors: {
            primary: ecommerceConfig.theme_color
          },
          originalStylesheetCount: -1,
          originalStyle: '',
          primaryColor: '#409eff',
          styleFiles: [],
          tasks: [],
      }
    },
    watch: {
      tasks: function (value) {
          if (value.length >= 2) {
              //
          }
      }
    },
    methods: {
        ...mapActions([
        ]),

        changeColor()
        {
            console.log('Change');
            this.primaryColor = this.colors.primary;
            this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary));
            this.writeNewStyle();
        },

        writeNewStyle ()
        {
            let cssText = this.originalStyle
            Object.keys(this.colors).forEach(key => {
              cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
            })
            if (this.originalStylesheetCount === document.styleSheets.length) {
              const style = document.createElement('style')
              style.innerText = cssText
              document.head.appendChild(style)
            } else {
              document.head.lastChild.innerText = cssText
            }
        },

        getIndexStyle ()
        {
            return new Promise((resolve, reject) => {
                this.getFile('/vendor/ecommerce/css/admin.css')
                  .then(({ data }) => {
                    this.originalStyle = this.getStyleTemplate(data);
                    resolve();
                  });
            })
        },

        getStyleTemplate (data)
        {
            const colorMap = {
              '#3a8ee6': 'shade-1',
              '#409eff': 'primary',
              '#53a8ff': 'light-1',
              '#66b1ff': 'light-2',
              '#79bbff': 'light-3',
              '#8cc5ff': 'light-4',
              '#a0cfff': 'light-5',
              '#b3d8ff': 'light-6',
              '#c6e2ff': 'light-7',
              '#d9ecff': 'light-8',
              '#ecf5ff': 'light-9'
            }
            Object.keys(colorMap).forEach(key => {
              const value = colorMap[key]
              data = data.replace(new RegExp(key, 'ig'), value)
            })
            return data
        },

        getSeparatedStyles ()
        {
            return new Promise((resolve, reject) => {
                this.getFile('//unpkg.com/element-ui/lib/theme-chalk/')
                  .then(({ data }) => {
                    return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1]);
                  })
                  .then(styleFiles => {
                    return Promise.all(styleFiles.map(file => {
                      return this.getFile(`//unpkg.com/element-ui/lib/theme-chalk/${file}`)
                    }))
                  })
                  .then(files => {
                    this.styleFiles = files.map(file => {
                      return {
                        name: file.url,
                        data: this.getStyleTemplate(file.data)
                      }
                    });
                    resolve();
                  })
            });
        },

        getFile (url, isBlob = false)
        {
            return new Promise((resolve, reject) => {
              const client = new XMLHttpRequest()
              client.responseType = isBlob ? 'blob' : ''
              client.onreadystatechange = () => {
                if (client.readyState !== 4) {
                  return
                }
                if (client.status === 200) {
                  const urlArr = client.responseURL.split('/')
                  resolve({
                    data: client.response,
                    url: urlArr[urlArr.length - 1]
                  })
                } else {
                  reject(new Error(client.statusText))
                }
              }
              client.open('GET', url)
              client.send()
            })
        },
    },
    components: {

    }
});
