module.exports = function (grunt) {
    var folderName = grunt.option('target');
    var jsFiles = require("../../frontend/files.js");
    var env = require("../../config/env/development.js");
    grunt.config.set('ejs', {
        ui: {
            src: 'views/development.ejs',
            dest: folderName + '/index.html',
            options: {
                _: require("lodash"),
                jsFiles: jsFiles,
                adminurl: env.realHost + "/api/",
            }
        }
    });

    grunt.loadNpmTasks('grunt-ejs-locals');
};