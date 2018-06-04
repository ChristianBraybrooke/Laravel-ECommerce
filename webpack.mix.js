let mix = require('laravel-mix');
const { exec } = require('child_process');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.webpackConfig({
     node: {
       fs: "empty"
     },
     output: {
         publicPath: '/vendor/ecommerce/',
         chunkFilename: 'js/chunks/[name].js',
     },
     module: {
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
      ],
     }
 });

// mix.browserSync({
//   proxy: {
//       target: "https://staging.toiletcubiclesonline.dev",
//   },
//   browser: "google chrome"
// });

mix.js('resources/assets/admin-spa/admin.js', 'public/js/admin.js')
   .styles(['node_modules/normalize.css/normalize.css'], 'public/css/normalize.css')
   .sass('resources/assets/admin-spa/sass/admin.scss', 'public/css/admin.css')
   .setPublicPath('public')
   .extract(['vue', 'element-ui', 'vue-router', 'vuex'])
   .version();
