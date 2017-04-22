module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: {
      options: {
        data: ['data.json'],
        expand: true,
        flatten: false,
        partials: ['dev/partials/**/*.hbs'],
        prettify: { indent: 4 },
      },
      dev: {
        files: [
          {
            // 'dev/': ['dev/**/*.hbs']
             expand: true,
             cwd: 'dev/',
             src: '**/*.hbs',
             dest: 'build/',
             ext: '.html'
          }
        ]
      },
      // dist: {
      //   src: ['build/*.hbs'],
      //   dest: './'
      // }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: 35729,
          hostname: '0.0.0.0'
        },
        livereload: {
          options: {
            open: {
              target: 'http://localhost:9000/local/index.html'
            },
            base: [
              'local/*'
            ]
          }
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['dev/less/']
        },
        files: {
          'build/css/deckerbot.css': 'dev/less/deckerbot.less'
        }
      },
      production: {
        options: {
          paths: ['assets/css'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            // new (require('less-plugin-clean-css'))(cleanCssOptions)
          ],
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }
        },
        files: {
          '/css/deckerbot.css': '/less/deckerbot.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      hbs: {
        files: 'dev/**/*.hbs',
        tasks: ['assemble'],
        options: {
          livereload: true
        },
      },
      js: {
        files: [
          'dev/**/*.js',
          'data.json'
        ],
        tasks: ['assemble'],
        options: {
          livereload: true
        },
      },
      less: {
        files: 'dev/**/*.less',
        tasks: ['assemble'],
        options: {
          livereload: true
        },
      },
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "<%= pkg.name %>", // defaults to the name in package.json, or will use project directory's name
        success: false, // whether successful grunt executions should be notified automatically
        duration: 3 // the duration of notification in seconds, for `notify-send only
      }
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-processhtml');



  // Run localhost server
  grunt.registerTask('default', function(target) {
    grunt.task.run([
      'notify_hooks',
      'connect',
      'watch'
    ]);
  });

  // Default task(s).
  grunt.registerTask('dist', ['uglify']);

};