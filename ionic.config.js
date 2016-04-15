module.exports = {
  proxies: [
    {
      "path": "/corsDestroyer",
      "proxyUrl": "https://www.linkedin.com/uas/oauth2/accessToken"
    }
  ],

  paths: {
    html : {
      src: ['app/**/*.html'],
      dest: "www/build"
    },
    sass: {
      src: ['app/theme/app.+(ios|md).scss'],
      dest: 'www/build/css',
      include: [
        'node_modules/ionic-angular',
        'node_modules/ionicons/dist/scss'
      ]
    },
    fonts: {
      src: ['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)'],
      dest: "www/build/fonts"
    },
    assets : {
      src: ['app/assets/*.*'],
      dest: "www/build/assets"
    },
    watch: {
      sass: ['app/**/*.scss'],
      html: ['app/**/*.html'],
      assets: ['app/assets/*.*'],
      livereload: [
        'www/build/**/*.html',
        'www/build/**/*.js',
        'www/build/**/*.css',
        'www/build/assets/*.*'
      ]
    }
  },

  autoPrefixerOptions: {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },

  // hooks execute before or after all project-related Ionic commands
  // (so not for start, docs, but serve, run, etc.) and take in the arguments
  // passed to the command as a parameter
  //
  // The format is 'before' or 'after' + commandName (uppercased)
  // ex: beforeServe, afterRun, beforePrepare, etc.
  hooks: {
    beforeServe: function(argv) {
      //console.log('beforeServe');
    }
  }
};
