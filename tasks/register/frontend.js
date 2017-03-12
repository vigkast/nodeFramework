module.exports = function (grunt) {
    grunt.registerTask('frontend', ["sass:development", "concurrent:watchDevelopment"]);
};