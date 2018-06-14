let mix = require('laravel-mix');

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
      },
 });

mix.setPublicPath('public')
   .js('resources/assets/admin-spa/admin.js', 'public/js/admin.js')
   .styles(['node_modules/normalize.css/normalize.css'], 'public/css/normalize.css')
   .copy('node_modules/element-ui/lib/theme-chalk/fonts/', 'public/fonts')
   // .copy('node_modules/element-ui/lib/theme-chalk/fonts/', 'public/fonts')
   .sass('resources/assets/admin-spa/sass/admin.scss', 'public/css/admin.css')
   // .copy('public', '../app/public/vendor/ecommerce')
   .extract(['vue', 'element-ui', 'vue-router', 'vuex'])
   .version();
