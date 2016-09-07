var exec = require('child_process').exec;
var htmlToText = require('html-to-text');


module.exports = {
    index: function(req, res) {
        res.metaView();
    },
    movie: function(req, res) {
        if (req.params && req.params[0]) {
            var movieID = req.params[0].split("/");
            Movie.getOneMovie({
                _id: movieID[0]
            }, function(err, data) {
                if (err) {
                    res.callback(err, data);
                } else if (_.isEmpty(data)) {
                    res.callback(err, data);
                } else {
                    var movie = data.movie;
                    var text = htmlToText.fromString(movie.synopsis, {
                        wordwrap: 500
                    });
                    text = _.trunc(_.trim(text), {
                        'length': 190,
                        'separator': ' '
                    });
                    res.metaView({
                        title: movie.name + " - " + movie.year,
                        keywords: movie.keywords,
                        description: text,
                        image: movie.theatricalTrailerImage
                    });
                }
            });
        } else {
            res.metaView();
        }
    },
    tv: function(req, res) {
        if (req.params && req.params[0]) {
            var movieID = req.params[0].split("/");
            Movie.getOneMovie({
                _id: movieID[0]
            }, function(err, data) {
                if (err) {
                    res.callback(err, data);
                } else if (_.isEmpty(data)) {
                    res.callback(err, data);
                } else {
                    var movie = data.movie;
                    res.metaView({
                        title: movie.name + " - " + movie.year,
                        keywords: movie.keywords,
                        description: movie.desciption,
                        image: movie.theatricalTrailerImage
                    });
                }
            });
        } else {
            res.metaView();
        }
    },
    download: function(req, res) {
        
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    backend: function(req, res) {
        var env = require("../../config/env/" + sails.config.environment + ".js");
        res.view("backend", {
            jsFiles: jsFilesBackend,
            title: "Dharma Production Backend",
            description: "Dharma Production Backend",
            keywords: "Dharma Production Backend",
            adminurl: env.realHost + "/api/",
        });
    },
    gitPull: function(req, res) {
        function gitPull() {
            exec('git pull', function(error, stdout, stderr) {
                if (error) {
                    return;
                }
                res.callback(error, {
                    stdout: stdout,
                    stderr: stderr
                });
            });
        }

        function decryptData(text) {

            if (text) {
                if (moment.unix(text).isBetween(moment().add(-1, "minute"), moment().add(1, "minute"))) {
                    gitPull();
                } else {
                    res.notFound();
                }
            } else {
                res.notFound();
            }
        }
        if (req.params && req.params.data) {
            decryptData(req.params.data);
        } else {
            res.notFound();
        }
    }


};
