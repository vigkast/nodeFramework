var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require("mongodb").ObjectId;
var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  year: {
    type: String,
    default: ""
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    index: true
  },
  award: [{
    winner: {
      type: String,
      default: ""
    },
    awardname: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    }
  }]
});

module.exports = mongoose.model('NewAward', schema);
var models = {
  saveData: function(data, callback) {
    var newaward = this(data);
    newaward.timestamp = new Date();
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
      newaward.save(function(err, created) {
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
    this.find({}).exec(function(err, found) {
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
  findLimited: function(data, callback) {
    var obj={};

    if(data._id && data._id !==''){
       obj={
               movie:data._id
             };
    }
    var newreturns = {};
    newreturns.data = [];
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          NewAward.count(obj).exec(function(err, number) {
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
          NewAward.find(obj).populate("movie",'name').skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
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


  //SIDEMENU NEW AWARD

  saveAward: function(data, callback) {
    console.log(data);
    var newaward = data.newaward;
    if (!data._id) {
      NewAward.update({
        _id: newaward
      }, {
        $push: {
          award: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "award.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      NewAward.update({
        "award._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },

  getAllAward: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          NewAward.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$award"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          NewAward.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$award"
          }, {
            $group: {
              _id: "_id",
              award: {
                $push: "$award"
              }
            }
          }, {
            $project: {
              _id: 0,
              award: {
                $slice: ["$award", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].award;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
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


  deleteAward: function(data, callback) {
    NewAward.update({
      "award._id": data._id
    }, {
      $pull: {
        "award": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });

  },
  getOneAward: function(data, callback) {
    // aggregate query
    NewAward.aggregate([{
      $unwind: "$award"
    }, {
      $match: {
        "award._id": objectid(data._id)
      }
    }, {
      $project: {
        award: 1
      }
    }]).exec(function(err, respo) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (respo && respo.length > 0 && respo[0].award) {
        callback(null, respo[0].award);
      } else {
        callback({
          message: "No data found"
        }, null);
      }
    });
  },

  getMovieAward: function(data, callback) {
    this.find({
      "movie": data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
        console.log(" All data ");
        console.log(found);
      } else {
        callback(null, {});
      }
    });

  },


  getAllAwardByMovie: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    var skip = parseInt(data.pagesize * (data.pagenumber - 1));
    async.parallel([
        function(callback) {
          NewAward.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$movie"
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              count: 1
            }
          }]).exec(function(err, result) {
            console.log(result);
            if (result && result[0]) {
              newreturns.total = result[0].count;
              newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
            }
          });
        },
        function(callback) {
          NewAward.aggregate([{
            $match: {
              _id: objectid(data._id)
            }
          }, {
            $unwind: "$movie"
          }, {
            $group: {
              _id: "_id",
              award: {
                $push: "$movie"
              }
            }
          }, {
            $project: {
              _id: 0,
              movie: {
                $slice: ["$movie", skip, data.pagesize]
              }
            }
          }]).exec(function(err, found) {
            console.log(found);
            if (found && found.length > 0) {
              newreturns.data = found[0].award;
              callback(null, newreturns);
            } else if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback({
                message: "Count of null"
              }, null);
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
};

module.exports = _.assign(module.exports, models);
