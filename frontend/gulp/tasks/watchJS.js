import config from '../../config.json';
import gulp from 'gulp';
import bundleJs from '../lib/jsBundle';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import merge from 'utils-merge';

import vueify from 'vueify';
import aliasify from 'aliasify';
import hmr from 'browserify-hmr';


//console.log(config.src.js + config.files.jsApp.srcName);

const watchJs = () => {
  const args = merge(watchify.args, {debug: true})
  const bundler = watchify(
    browserify(config.src.js + config.files.jsApp.srcName, args)
  )
  
  .plugin(hmr)
  
  .transform(
    babelify.configure({presets: ['es2015']})
  )
  
  .transform(aliasify,{
    aliases: {
      "vue": "./node_modules/vue/dist/vue.js"
    },
    verbose: true
  })
  .transform(vueify)
  

  bundleJs(bundler)

  bundler.on('update', function () {
    console.log('-> bundling...')
    bundleJs(bundler);
    console.log('Bundled JS Files');
  })
}

gulp.task('watch:js', watchJs);
module.exports = watchJs;
