let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const appPath = path.resolve(__dirname, 'resources', 'assets', 'admin-spa');

mix.js('resources/assets/admin-spa/admin.js', 'public/js/admin.js')
  .styles(['node_modules/normalize.css/normalize.css'], 'public/css/reset.css')
  .copy('node_modules/element-ui/lib/theme-chalk/fonts/', 'public/fonts')
  .sass('resources/assets/admin-spa/sass/admin.scss', 'public/css/admin.css')
  .extract(['vue', 'element-ui', 'vue-router', 'vuex', 'axios', 'vue-quill-editor'])
  .setPublicPath('public')
  .version()
  .webpackConfig({
     node: {
       fs: "empty"
     },
     output: {
         publicPath: '/vendor/ecommerce/',
         chunkFilename: 'js/chunks/[name].js',
     },
     module: {
       rules: [
         {
           enforce: 'pre',
           test: /\.(js|vue)$/,
           loader: 'eslint-loader',
           exclude: /node_modules/
         }
       ],
       loaders: [
         {
             test: /\.jsx$/,
             loader: 'babel'
         },
         {
             test: /\.js$/,
             loader: 'babel',
             exclude: /node_modules/
         },
         {
             test: /\.ejs$/,
             loader: 'ejs-loader',
         },
        ]
      },
      resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.runtime.esm.js',
            'axios': 'axios/dist/axios.min.js',
            'components': path.resolve(appPath, 'components'),
            'pages': path.resolve(appPath, 'pages'),
            'services': path.resolve(appPath, 'services'),
            'utils': path.resolve(appPath, 'utils'),
        }
      }
  })
  .options({
   terser: {
     terserOptions: {
       compress: {
           drop_console: true,
           warnings: false,
           conditionals: true,
           unused: true,
           comparisons: false,
           sequences: true,
           dead_code: true,
           evaluate: true,
           if_return: true,
           join_vars: true,
       }
     }
   }
  });

  if (!mix.inProduction()) {
      mix.copy('public', '../../public/vendor/ecommerce');

     mix.browserSync({
         open: 'external',
         host: 'laravel-package-development.test',
         proxy: 'laravel-package-development.test',
         browser: "google chrome"
     });
  }
