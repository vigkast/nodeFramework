module.exports = function (grunt) {

    grunt.config.set('sass', {
        development: {
            options: {
                sourceMap: true
            },
            files: {
                "frontend/css/main.css": "frontend/sass/main.scss",
                // "frontend/css/import.css": "frontend/sass/import.scss"
            }
        },
        backendDevelopment: {
            options: {
                sourceMap: true
            },
            files: {
                ".tmp/public/backend/css/main.css": "backend/sass/main.scss"
            }
        },
        production: {
            options: {
                sourceMap: false
            },
            files: {
                ".tmp/public/frontend/css/main.css": "frontend/sass/main.scss"
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
};