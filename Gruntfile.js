
module.exports = function (grunt) {

  "use strict";

  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app'
  };

  grunt.initConfig({

    config: config,

    /**
     * Watch settings for automatic task execution
     */
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['<%= config.app %>/styles/less/{,*/}*.less'],
        tasks: ['less'],
        options: {
          forever: true
        }
      }
    },

    /**
     * Check for js mistakes
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js'
      ]
    },

    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.']
      },
      files: {
        src: [
          "<%= config.app %>/**/*.html",
          "!<%= config.app %>/components/**/*.html"
        ]
      }
    },

    less: {
      main: {
        options: {
          strictMath: false,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: '<%= config.app %>/styles/css/main.css.map',
          sourceMapURL: 'main.css.map'
        },
        files: {
          '<%= config.app %>/styles/css/main.css': ['<%= config.app %>/styles/less/main.less']
        },
      },
    }
  });

  grunt.registerTask('pre-commit', [
    'jshint',
    'validation'
  ]);

  grunt.registerTask('default', [
    'less'
  ]);
};
