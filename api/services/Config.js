/**
 * Config.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Twitter = require("twitter");

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var lwip = require("lwip");
var process = require('child_process');
var lodash = require('lodash');
var moment = require('moment');
var MaxImageSize = 1600;
var request = require("request");
var requrl = "http://localhost:80/";
// var requrl = "http://localhost:90/"; ///////////////////////////////////////////////////change kar
var gfs = Grid(mongoose.connections[0].db, mongoose);
gfs.mongo = mongoose.mongo;
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    content: String,
});

var client = new Twitter({
    consumer_key: 'w0Mizb3YKniG8GfZmhQJbMvER',
    consumer_secret: '6wnwpnm6a475ROm3aY8aOy8YXynQxQgZkcoJ05Y8D9EvL0Duov',
    access_token_key: '121427044-PJTEM2zmqwcRu4K0FBotK9jtTibsNOiomyVlkSo0',
    access_token_secret: 'TvMPCXaXpJOvpu8hCGc61kzp5EpIPbrAgOT7u6lDnastg'
});

module.exports = mongoose.model('Config', schema);

var models = {
    getTweets: function(hashtag, users, callback) {

        var string = "from:";
        _.each(users, function(n) {
            string += n + " OR from:";
        });

        string = string.substr(0, string.length - 9) + " " + hashtag;

        console.log(string);
        var params = {
            q: string,
            count: 100
        };
        client.get('search/tweets', params, function(error, tweets, response) {

            callback(error, tweets);
        });
    },
    GlobalCallback: function(err, data, res) {
        if (err) {
            res.json({
                error: err,
                value: false
            });
        } else {
            res.json({
                data: data,
                value: true
            });
        }
    },
    uploadFile: function(filename, callback) {
        var id = mongoose.Types.ObjectId();
        var extension = filename.split(".").pop();
        extension = extension.toLowerCase();
        if (extension == "jpeg") {
            extension = "jpg";
        }
        var newFilename = id + "." + extension;

        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        var imageStream = fs.createReadStream(filename);

        function writer2(metaValue) {
            var writestream2 = gfs.createWriteStream({
                filename: newFilename,
                metadata: metaValue
            });
            writestream2.on('finish', function() {
                callback(null, {
                    name: newFilename
                });
                fs.unlink(filename);
            });
            fs.createReadStream(filename).pipe(writestream2);
        }

        if (extension == "png" || extension == "jpg" || extension == "gif") {
            lwip.open(filename, extension, function(err, image) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    var upImage = {
                        width: image.width(),
                        height: image.height(),
                        ratio: image.width() / image.height()
                    };

                    if (upImage.width > upImage.height) {
                        if (upImage.width > MaxImageSize) {
                            image.resize(MaxImageSize, MaxImageSize / (upImage.width / upImage.height), function(err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function(err) {
                                        writer2(upImage);
                                    });
                                }
                            });
                        } else {
                            writer2(upImage);
                        }
                    } else {
                        if (upImage.height > MaxImageSize) {
                            image.resize((upImage.width / upImage.height) * MaxImageSize, MaxImageSize, function(err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function(err) {
                                        writer2(upImage);
                                    });
                                }
                            });
                        } else {
                            writer2(upImage);
                        }
                    }
                }
            });
        } else {
            imageStream.pipe(writestream);
        }

        writestream.on('finish', function() {
            callback(null, {
                name: newFilename
            });
            fs.unlink(filename);
        });
    },
    readUploaded: function(filename, width, height, style, res) {

        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function(err) {
            res.json({
                value: false,
                error: err
            });
        });

        var bufs = [];

        readstream.on('data', function(chunk) {
            bufs.push(chunk);
        });
        readstream.on('end', function() { // done
            if (!(width && height)) {
                var fbuf = Buffer.concat(bufs);
                res.set('Cache-Control', 'public, max-age=31536000');
                res.set("Content-Type", "image/jpeg");
                res.send(fbuf);
            }
        });

        function writer2(filename, gridFSFilename, metaValue) {
            var writestream2 = gfs.createWriteStream({
                filename: gridFSFilename,
                metadata: metaValue
            });
            writestream2.on('finish', function() {
                fs.unlink(filename);
            });
            var readstream2 = fs.createReadStream(filename).pipe(writestream2);
            readstream2.on('error', function(err) {
                res.json({
                    value: false,
                    error: err
                });
            });

            var bufs = [];

            readstream2.on('data', function(chunk) {
                bufs.push(chunk);
            });
            readstream2.on('end', function() { // done
                var fbuf = Buffer.concat(bufs);
                res.set('Cache-Control', 'public, max-age=31536000');
                res.set("Content-Type", "image/jpeg");
                res.send(fbuf);
            });
        }

        function read2(filename2) {
            var readstream2 = gfs.createReadStream({
                filename: filename2
            });
            readstream2.on('error', function(err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            var bufs = [];
            readstream2.on('data', function(chunk) {
                bufs.push(chunk);
            });
            readstream2.on('end', function() { // done
                var fbuf = Buffer.concat(bufs);
                res.set('Cache-Control', 'public, max-age=31536000');
                res.set("Content-Type", "image/jpeg");
                res.send(fbuf);
            });
        }
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
            //attempt to get same size image and serve
            var newName = onlyName;
            if (width > 0) {
                newName += "-" + width;
            } else {
                newName += "-" + 0;
            }
            if (height) {
                newName += "-" + height;
            } else {
                newName += "-" + 0;
            }
            if (style && (style == "fill" || style == "cover")) {
                newName += "-" + style;
            } else {
                newName += "-" + 0;
            }
            var newNameExtire = newName + "." + extension;
            gfs.exist({
                filename: newNameExtire
            }, function(err, found) {
                if (err) {
                    res.json({
                        value: false,
                        error: err
                    });
                }
                if (found) {
                    read2(newNameExtire);
                } else {

                    var imageStream = fs.createWriteStream('./.tmp/uploads/' + filename);

                    readstream.pipe(imageStream);

                    imageStream.on("finish", function() {

                        fs.exists('./.tmp/uploads/' + filename, function(exists) {

                            if (exists) {
                                lwip.open('./.tmp/uploads/' + filename, function(err, image) {
                                    ImageWidth = image.width();
                                    ImageHeight = image.height();
                                    var newWidth = 0;
                                    var newHeight = 0;
                                    var pRatio = width / height;
                                    var iRatio = ImageWidth / ImageHeight;
                                    if (width && height) {
                                        newWidth = width;
                                        newHeight = height;
                                        switch (style) {
                                            case "fill":
                                                if (pRatio > iRatio) {
                                                    newHeight = height;
                                                    newWidth = height * (ImageWidth / ImageHeight);
                                                } else {
                                                    newWidth = width;
                                                    newHeight = width / (ImageWidth / ImageHeight);
                                                }
                                                break;
                                            case "cover":
                                                if (pRatio < iRatio) {
                                                    newHeight = height;
                                                    newWidth = height * (ImageWidth / ImageHeight);
                                                } else {
                                                    newWidth = width;
                                                    newHeight = width / (ImageWidth / ImageHeight);
                                                }
                                                break;
                                        }
                                    } else if (width) {
                                        newWidth = width;
                                        newHeight = width / (ImageWidth / ImageHeight);
                                    } else if (height) {
                                        newWidth = height * (ImageWidth / ImageHeight);
                                        newHeight = height;
                                    }
                                    image.resize(parseInt(newWidth), parseInt(newHeight), function(err, image2) {

                                        if (style == "cover") {

                                            image2.crop(parseInt(width), parseInt(height), function(err, image3) {
                                                if (err) {

                                                } else {

                                                    image3.writeFile('./.tmp/uploads/' + filename, function(err) {
                                                        writer2('./.tmp/uploads/' + filename, newNameExtire, {
                                                            width: newWidth,
                                                            height: newHeight
                                                        });
                                                    });
                                                }
                                            });



                                        } else {
                                            image2.writeFile('./.tmp/uploads/' + filename, function(err) {
                                                writer2('./.tmp/uploads/' + filename, newNameExtire, {
                                                    width: newWidth,
                                                    height: newHeight
                                                });
                                            });
                                        }
                                    });
                                });

                            } else {
                                res.json({
                                    error: "file does not exists",
                                    value: false
                                });
                            }
                        });


                    });
                }
            });
            //else create a resized image and serve
        } else {
            // readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
    }
};
module.exports = _.assign(module.exports, models);
