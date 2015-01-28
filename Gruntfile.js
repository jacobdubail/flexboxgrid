/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    // myth: {
    //   compile: {
    //     expand: true,
    //     cwd: 'css',
    //     src: ['*.css', '!*.min.css'],
    //     dest: 'css',
    //     ext: '.css'
    //   },
    //   release: {
    //     files: {
    //       'dist/flexboxgrid.css': 'src/css/flexboxgrid.css'
    //     }
    //   }
    // },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'nested'
        },
        files: {                         // Dictionary of files
          'src/css/flexboxgrid.css': 'src/scss/flexboxgrid.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      single_file: {
        src: 'src/css/flexboxgrid.css',
        dest: 'dist/flexboxgrid.css'
      },
    },
    cssmin: {
      concat: {
        files: {
          'css/index.css': ['vendor/css/normalize.css', 'src/css/style.css', 'dist/flexboxgrid.css']
        }
      },
      minify: {
        expand: true,
        cwd: 'css',
        src: ['*.css', '!*.min.css'],
        dest: 'css',
        ext: '.min.css'
      },
      release: {
        expand: true,
        cwd: 'dist',
        src: ['*.css', '!*.min.css'],
        dest: 'dist',
        ext: '.min.css'
      }
    },
    uglify: {
      release: {
        files: {
          'js/index.js': 'src/js/index.js'
        }
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true
        },
        files: {
          'index.html': ['src/index.html']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': ['index.html']
        }
      }
    },
    watch: {
      css: {
        //files: 'src/**/*',
        files: 'src/scss/*.scss',
        tasks: ['default'],
      },
      livereload: {
        options: {
          livereload: true,
        },
        files: [
          'index.html',
          'css/*.css',
          'js/*.js',
          'img/*'
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-myth');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task.
  grunt.registerTask('default', [
    //'myth',
    'sass',
    'autoprefixer',
    'cssmin:concat',
    'cssmin:minify',
    'cssmin:release',
    'uglify',
    'processhtml',
    'htmlmin'
  ]);
  grunt.registerTask('reload', ['watch']);

};
