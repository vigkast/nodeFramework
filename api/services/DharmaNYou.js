/**
 * DharmaNYou.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  user: {
    type:String,
    default:''
  },
  image: {
    type: String
  },
  question: {
    type: String,
    required: true
  },
  questionTimestamp: {
    type: Date,
    default: Date.now
  },
  answer: {
    type: String,
    default: ""
  },
  answerTimestamp: {
    type: Date
  },
  dharmaAnswerUser: {
    type: Schema.Types.ObjectId,
    ref: "DharmaAnswerUser"
  },
  status: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    default: ""
  }

});
module.exports = mongoose.model('DharmaNYou', schema);

var models = {

  saveData: function(data, callback) {
    if (!data.dharmaAnswerUser || data.dharmaAnswerUser === "") {
      delete data.dharmaAnswerUser;
    }
    var dharmaNYou = this(data);
    // dharmaNYou.timestamp = new Date();
    if (data._id) {
      if (data.answer ) {
        data.answerTimestamp = new Date().getTime();
        console.log(data.answerTimestamp);
      }
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
      dharmaNYou.save(function(err, created) {
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
    DharmaNYou.find({}).populate('dharmaAnswerUser').exec(function(err, found) {
      console.log(found);
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

  getData: function(data, callback) {
    this.find({}, {
      url: 1
    }).lean().exec(function(err, found) {
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
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    console.log(check);
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          DharmaNYou.count({
            question: {
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
          DharmaNYou.find({
            question: {
              '$regex': check
            }
          }).populate("dharmaAnswerUser", "name ").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
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
  }
};

module.exports = _.assign(module.exports, models);
