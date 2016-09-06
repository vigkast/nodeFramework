var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    image: {
        type: String,
        default: ""
    },
    banner: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        index: true
    },
    order:{
      type: Number,
      default: 0
    }
});

module.exports = mongoose.model('News', schema);
var models = {
    saveData: function(data, callback) {
        if (data.movie === '') {
            delete data.movie;
        }
        var news = this(data);
        news.timestamp = new Date();
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data).exec(function(err, updated) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (updated) {
                    callback(null, updated);
                } else {
                    callback(null, {});
                }
            });
        } else {
            news.save(function(err, created) {
                if (err) {
                    callback(err, null);
                } else if (created) {
                    callback(null, created);
                } else {
                    callback(null, {});
                }
            });
        }
    },
    deleteData: function(data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function(err, deleted) {
            if (err) {
                callback(err, null);
            } else if (deleted) {
                callback(null, deleted);
            } else {
                callback(null, {});
            }
        });
    },
    getAll: function(data, callback) {
        this.find({}).sort({
            date: -1
        }).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (found && found.length > 0) {
                callback(null, found);
            } else {
                callback(null, []);
            }
        });
    },
    getOne: function(data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (found && Object.keys(found).length > 0) {
                callback(null, found);
            } else {
                callback(null, {});
            }
        });
    },
    getOneNews: function(data, callback) {
        var newreturns = {};
        this.findOne({
            "_id": data._id
        }).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (found && Object.keys(found).length > 0) {
                newreturns.data = found;
                if (found.movie) {
                    News.find({
                        movie: found.movie,

                        _id: {
                            $ne: data._id
                        }

                    }).limit(3).exec(function(err, data3) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            newreturns.related = data3;
                            callback(null, newreturns);
                        }
                    });
                } else {
                    callback(null, newreturns);
                }

            } else {
                callback(null, {});
            }
        });
    },
    findLimited: function(data, callback) {
        var newreturns = {};
        newreturns.data = [];
        var matchobj = {
            year: parseInt(data.year),
            month: parseInt(data.month)
        };
        var check = new RegExp(data.search, "i");
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);

        if (!data.year || data.year == "All") {
            delete matchobj.year;
        }
        if (!data.month || data.month == "All") {
            delete matchobj.month;
        }
        async.parallel([
                function(callback) {
                    News.aggregate([{
                        $project: {
                            _id: 1,
                            title: 1,
                            image: 1,
                            date: 1,
                            text: 1,
                              order:1,
                            __v: 1,
                            year: {
                                $year: "$date"
                            },
                            month: {
                                $month: "$date"
                            }
                        }
                    }, {
                        $match: {
                            $or: [{
                              "text":{
                                  $regex: check
                              }
                            },{
                              "title":{
                                $regex:check
                              }
                            }]
                        }
                    }, {
                        $match: matchobj
                    }, {
                        $group: {
                            _id: null,
                            count: {
                                $sum: 1
                            }
                        }
                    }]).exec(function(err, number) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (number && number.length > 0) {
                            newreturns.total = number[0].count;
                            newreturns.totalpages = Math.ceil(number[0].count / data.pagesize);
                            callback(null, newreturns);
                        } else {
                            newreturns.total = 0;
                            newreturns.totalpages = 0;
                            callback(null, newreturns);
                        }
                    });
                },
                function(callback) {
                    News.aggregate([{
                        $project: {
                            _id: 1,
                            title: 1,
                            image: 1,
                            date: 1,
                            text: 1,
                              order:1,
                            __v: 1,
                            year: {
                                $year: "$date"
                            },
                            month: {
                                $month: "$date"
                            }
                        }
                    }, {
                        $match: {
                            $or: [{
                              "text":{
                                $regex:check
                              }
                            },{
                              "title":{
                                $regex:check
                              }
                            }]
                        }
                    }, {
                        $match: matchobj
                    }, {
                        $project: {
                            _id: 1,
                            title: 1,
                            image: 1,
                            date: 1,
                            text: 1,
                            order:1,
                            year: {
                                $year: "$date"
                            },
                            month: {
                                $month: "$date"
                            }
                        }
                    }]).sort({
                        date: -1
                    }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (data2 && data2.length > 0) {
                            newreturns.data = data2;
                            callback(null, data2);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                }
            ],
            function(err, data4) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (data4) {
                    callback(null, newreturns);
                } else {
                    callback(null, newreturns);
                }
            });
    },



    findLimitedForBackend: function(data, callback) {
        var newreturns = {};
        newreturns.data = [];
        var check = new RegExp(data.search, "i");
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        async.parallel([
                function(callback) {
                    News.count({
                        title: {
                            '$regex': check
                        }
                    }).exec(function(err, number) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (number && number !== "") {
                            newreturns.total = number;
                            newreturns.totalpages = Math.ceil(number / data.pagesize);
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                },
                function(callback) {
                    News.find({
                        title: {
                            '$regex': check
                        }
                    }).populate("movie").sort({
                        date: -1
                    }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (data2 && data2.length > 0) {
                            newreturns.data = data2;
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                }
            ],
            function(err, data4) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (data4) {
                    callback(null, newreturns);
                } else {
                    callback(null, newreturns);
                }
            });
    },

    getMonthYear: function(data, callback) {
        News.aggregate([{
            $project: {
                _id: 1,
                date: 1,
                year: {
                    $year: "$date"
                },
                month: {
                    $month: "$date"
                }
            }
        }, {
            $group: {
                _id: null,
                year: {
                    $addToSet: "$year"
                },
                month: {
                    $addToSet: "$month"
                }
            }
        }]).exec(function(err, dates) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                dates[0].year.unshift("All");
                dates[0].month.unshift("All");
                callback(null, dates[0]);
            }
        });
    },
    getOneArticle: function(data, callback) {
        this.find({
            "movie": data._id
        }).limit(3).exec(function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (found && Object.keys(found).length > 0) {
                callback(null, found);
            } else {
                callback(null, {});
            }
        });
    },

    ////////backup

    // findLimited: function(data, callback) {
    //     var newreturns = {};
    //     newreturns.data = [];
    //     var matchobj = {
    //         year: parseInt(data.year),
    //         month: parseInt(data.month)
    //     };
    //     var check = new RegExp(data.search, "i");
    //     console.log("check0", check);
    //     data.pagenumber = parseInt(data.pagenumber);
    //     data.pagesize = parseInt(data.pagesize);
    //
    //     if (!data.year || data.year == "All") {
    //         delete matchobj.year;
    //     }
    //     if (!data.month || data.month == "All") {
    //         delete matchobj.month;
    //     }
    //     console.log("sss", matchobj);
    //     async.parallel([
    //             function(callback) {
    //                 News.aggregate([{
    //                     $lookup: {
    //                         from: 'movies',
    //                         localField: 'movie',
    //                         foreignField: '_id',
    //                         as: 'movie'
    //                     }
    //                 }, {
    //                     $project: {
    //                         _id: 1,
    //                         title: 1,
    //                         image: 1,
    //                         date: 1,
    //                         text: 1,
    //                         __v: 1,
    //                         year: {
    //                             $year: "$date"
    //                         },
    //                         month: {
    //                             $month: "$date"
    //                         },
    //                         movie: {
    //                             $cond: [{
    //                                     $eq: ["$movie", []]
    //                                 },
    //                                 [{
    //                                     name: "$__v"
    //                                 }], "$movie"
    //                             ]
    //                         }
    //                     }
    //                 }, {
    //                     $unwind: "$movie"
    //                 }, {
    //                     $match: {
    //                         $or: [{
    //                             "movie.name": {
    //                                 $regex: check
    //                             }
    //                         }, {
    //                             "movie.name": 0
    //                         },{
    //                           "text":{
    //                               $regex: check
    //                           }
    //                         },{
    //                           "title":{
    //                             $regex:check
    //                           }
    //                         }]
    //                     }
    //                 }, {
    //                     $match: matchobj
    //                 }, {
    //                     $group: {
    //                         _id: null,
    //                         count: {
    //                             $sum: 1
    //                         }
    //                     }
    //                 }]).exec(function(err, number) {
    //                     if (err) {
    //                         console.log(err);
    //                         callback(err, null);
    //                     } else if (number && number.length > 0) {
    //                         newreturns.total = number[0].count;
    //                         newreturns.totalpages = Math.ceil(number[0].count / data.pagesize);
    //                         callback(null, newreturns);
    //                     } else {
    //                         newreturns.total = 0;
    //                         newreturns.totalpages = 0;
    //                         callback(null, newreturns);
    //                     }
    //                 });
    //             },
    //             function(callback) {
    //                 News.aggregate([{
    //                     $lookup: {
    //                         from: 'movies',
    //                         localField: 'movie',
    //                         foreignField: '_id',
    //                         as: 'movie'
    //                     }
    //                 }, {
    //                     $project: {
    //                         _id: 1,
    //                         title: 1,
    //                         image: 1,
    //                         date: 1,
    //                         text: 1,
    //                         __v: 1,
    //                         year: {
    //                             $year: "$date"
    //                         },
    //                         month: {
    //                             $month: "$date"
    //                         },
    //                         movie: {
    //                             $cond: [{
    //                                     $eq: ["$movie", []]
    //                                 },
    //                                 [{
    //                                     name: "$__v"
    //                                 }], "$movie"
    //                             ]
    //                         }
    //                     }
    //                 }, {
    //                     $unwind: "$movie"
    //                 }, {
    //                     $match: {
    //                         $or: [{
    //                             "movie.name": {
    //                                 $regex: check
    //                             }
    //                         }, {
    //                             "movie.name": 0
    //                         },{
    //                           "text":{
    //                             $regex:check
    //                           }
    //                         },{
    //                           "title":{
    //                             $regex:check
    //                           }
    //                         }]
    //                     }
    //                 }, {
    //                     $match: matchobj
    //                 }, {
    //                     $project: {
    //                         _id: 1,
    //                         title: 1,
    //                         image: 1,
    //                         date: 1,
    //                         text: 1,
    //                         year: {
    //                             $year: "$date"
    //                         },
    //                         month: {
    //                             $month: "$date"
    //                         }
    //                     }
    //                 }]).sort({
    //                     _id: -1
    //                 }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
    //                     if (err) {
    //                         console.log(err);
    //                         callback(err, null);
    //                     } else if (data2 && data2.length > 0) {
    //                         newreturns.data = data2;
    //                         callback(null, data2);
    //                     } else {
    //                         callback(null, newreturns);
    //                     }
    //                 });
    //             }
    //         ],
    //         function(err, data4) {
    //             if (err) {
    //                 console.log(err);
    //                 callback(err, null);
    //             } else if (data4) {
    //                 callback(null, newreturns);
    //             } else {
    //                 callback(null, newreturns);
    //             }
    //         });
    // },
};

module.exports = _.assign(module.exports, models);
