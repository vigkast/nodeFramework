/**
 * Config.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var lwip = require("lwip");
var process = require('child_process');
var lodash = require('lodash');
var moment = require('moment');
var MaxImageSize = 1600;
var request = require("request");

var gfs = Grid(mongoose.connections[0].db, mongoose);
gfs.mongo = mongoose.mongo;
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    content: String,
});

// var client = new Twitter({
//     consumer_key: 'w0Mizb3YKniG8GfZmhQJbMvER',
//     consumer_secret: '6wnwpnm6a475ROm3aY8aOy8YXynQxQgZkcoJ05Y8D9EvL0Duov',
//     access_token_key: '121427044-PJTEM2zmqwcRu4K0FBotK9jtTibsNOiomyVlkSo0',
//     access_token_secret: 'TvMPCXaXpJOvpu8hCGc61kzp5EpIPbrAgOT7u6lDnastg'
// });

module.exports = mongoose.model('Config', schema);

var models = {
    maxRow: 10,
    getForeignKeys: function (schema) {
        var arr = [];
        _.each(schema.tree, function (n, name) {
            if (n.key) {
                arr.push({
                    name: name,
                    ref: n.ref,
                    key: n.key
                });
            }
        });
        return arr;
    },
    checkRestrictedDelete: function (Model, schema, data, callback) {

        var values = schema.tree;
        var arr = [];
        var ret = true;
        _.each(values, function (n, key) {
            if (n.restrictedDelete) {
                arr.push(key);
            }
        });

        Model.findOne({
            "_id": data._id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                _.each(arr, function (n) {
                    if (data2[n].length !== 0) {
                        ret = false;
                    }
                });
                callback(null, ret);
            } else {
                callback("No Data Found", null);
            }
        });
    },
    manageArrayObject: function (Model, id, data, key, action, callback) {
        Model.findOne({
            "_id": id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                switch (action) {
                    case "create":
                        {
                            data2[key].push(data);
                            data2[key] = _.uniq(data2[key]);
                            console.log(data2[key]);
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                    case "delete":
                        {
                            _.remove(data2[key], function (n) {
                                return (n + "") == (data + "");
                            });
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                }
            } else {
                callback("No Data Found for the ID", null);
            }
        });


    },

    uploadFile: function (filename, callback) {
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
            writestream2.on('finish', function () {
                callback(null, {
                    name: newFilename
                });
                fs.unlink(filename);
            });
            fs.createReadStream(filename).pipe(writestream2);
        }

        if (extension == "png" || extension == "jpg" || extension == "gif") {
            lwip.open(filename, extension, function (err, image) {
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
                            image.resize(MaxImageSize, MaxImageSize / (upImage.width / upImage.height), function (err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function (err) {
                                        writer2(upImage);
                                    });
                                }
                            });
                        } else {
                            writer2(upImage);
                        }
                    } else {
                        if (upImage.height > MaxImageSize) {
                            image.resize((upImage.width / upImage.height) * MaxImageSize, MaxImageSize, function (err, image2) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    upImage = {
                                        width: image2.width(),
                                        height: image2.height(),
                                        ratio: image2.width() / image2.height()
                                    };
                                    image2.writeFile(filename, function (err) {
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

        writestream.on('finish', function () {
            callback(null, {
                name: newFilename
            });
            fs.unlink(filename);
        });
    },

    import: function (req, res) {
        var jsonExcel = xlsx.parse("./employee.xlsx");
        var retVal = [];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);

        function isYes(value) {
            value = _.upperCase(_.trim(value));
            if (value === "YES") {
                return true;
            } else {
                return false;
            }
        }

        function isDate(value) {
            value = (value - (25567 + 1)) * 86400 * 1000;
            var mom = moment(value);
            if (mom.isValid()) {
                return mom.toDate();
            } else {
                return undefined;
            }
        }
        async.eachSeries(excelDataToExport, function (n, callback) {
                n = _.map(n, function (m, key) {
                    var b = _.trim(m);
                    if (key == 19) {
                        b = _.capitalize(b);
                    }
                    return b;
                });
                Grade.getIdByName({
                    name: n[7],
                }, function (err, data) {
                    if (err) {
                        err.name = n[7];
                        retVal.push(err);
                        callback(null, data);
                    } else {
                        Func.getIdByName({
                            name: n[6]
                        }, function (err, data2) {
                            if (err) {
                                err.name = n[6];
                                retVal.push(err);
                                callback(null, data2);
                            } else {
                                Branch.getIdByName({
                                    code: n[38],
                                }, function (err, data3) {
                                    if (err) {
                                        retVal.push(err);
                                        callback(null, data3);
                                    } else {
                                        City.getIdByName({
                                            name: n[19],
                                        }, function (err, data4) {
                                            if (err) {
                                                err.name = n[19];
                                                retVal.push(err);
                                                callback(null, data4);
                                            } else {
                                                City.getIdByName({
                                                    name: n[5],
                                                }, function (err, dataPostedAt) {
                                                    if (err) {
                                                        err.name = n[19];
                                                        retVal.push(err);
                                                        callback(null, data4);
                                                    } else {
                                                        Office.getIdByName({
                                                            name: n[5],
                                                        }, function (err, data5) {
                                                            if (err) {
                                                                retVal.push(err);
                                                                callback(null, data5);
                                                            } else {
                                                                Employee.getIdByName({
                                                                    name: n[3] + " " + n[4],
                                                                    firstName: n[3],
                                                                    lastName: n[4],
                                                                    company: "57b08c39e69e5abf43334252",
                                                                    salutation: n[2],
                                                                    branch: data3,
                                                                    func: data2,
                                                                    postedAt: dataPostedAt,
                                                                    grade: data,
                                                                    houseColor: n[8],
                                                                    employeeCode: n[10],
                                                                    photo: "",
                                                                    bank: n[11],
                                                                    accountNumber: n[13],
                                                                    branchName: n[12],
                                                                    neftCode: n[14],
                                                                    gender: n[39],
                                                                    city: data4,
                                                                    address: n[21],
                                                                    pincode: n[20],
                                                                    lat: n[22],
                                                                    lng: n[23],
                                                                    officeNumber: n[24],
                                                                    officeMobile: n[25],
                                                                    officeEmail: n[26],
                                                                    homeNumber: n[27],
                                                                    mobile: n[28],
                                                                    email: n[29],
                                                                    extension: n[30],
                                                                    birthDate: isDate(n[31]),
                                                                    marriageDate: isDate(n[33]),
                                                                    joiningDate: isDate(n[32]),
                                                                    leavingDate: isDate(n[34]),
                                                                    isSBC: isYes(n[35]),
                                                                    isField: isYes(n[36]),
                                                                    isSurveyor: isYes(n[37]),

                                                                }, function (err, data6) {
                                                                    if (err) {
                                                                        retVal.push(err);
                                                                        callback(null, data6);
                                                                    } else {
                                                                        retVal.push(data6);
                                                                        callback(null, data6);
                                                                    }
                                                                });
                                                            }
                                                        });

                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            function (err, data) {
                if (err) {
                    callback(err, data);
                } else {
                    res.json({
                        total: retVal.length,
                        value: retVal
                    });
                }
            });
    },
    generateExcel: function (name, found, res) {
        // name = _.kebabCase(name);
        var excelData = [];
        _.each(found, function (singleData) {
            var singleExcel = {};
            _.each(singleData, function (n, key) {
                if (key != "__v" && key != "createdAt" && key != "updatedAt") {
                    singleExcel[key] = n;
                }
            });
            excelData.push(singleExcel);
        });
        var xls = json2xls(excelData);
        var folder = "./.tmp/";
        var path = name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
        var finalPath = folder + path;
        fs.writeFile(finalPath, xls, 'binary', function (err) {
            if (err) {
                res.callback(err, null);
            } else {
                fs.readFile(finalPath, function (err, excel) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        res.set('Content-Type', "application/octet-stream");
                        res.set('Content-Disposition', "attachment;filename=" + path);
                        res.send(excel);
                        fs.unlink(finalPath);
                    }
                });
            }
        });

    },
    readUploaded: function (filename, width, height, style, res) {
        res.set({
            'Cache-Control': 'public, max-age=31557600',
            'Expires': new Date(Date.now() + 345600000).toUTCString()
        });
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });

        function writer2(filename, gridFSFilename, metaValue) {
            var writestream2 = gfs.createWriteStream({
                filename: gridFSFilename,
                metadata: metaValue
            });
            writestream2.on('finish', function () {
                fs.unlink(filename);
            });
            fs.createReadStream(filename).pipe(res);
            fs.createReadStream(filename).pipe(writestream2);
        }

        function read2(filename2) {
            var readstream2 = gfs.createReadStream({
                filename: filename2
            });
            readstream2.on('error', function (err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            readstream2.pipe(res);
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
            }, function (err, found) {
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
                    imageStream.on("finish", function () {
                        lwip.open('./.tmp/uploads/' + filename, function (err, image) {
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
                            image.resize(parseInt(newWidth), parseInt(newHeight), function (err, image2) {
                                image2.writeFile('./.tmp/uploads/' + filename, function (err) {
                                    writer2('./.tmp/uploads/' + filename, newNameExtire, {
                                        width: newWidth,
                                        height: newHeight
                                    });
                                });
                            });
                        });
                    });
                }
            });
            //else create a resized image and serve
        } else {
            readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
    }
};
module.exports = _.assign(module.exports, models);