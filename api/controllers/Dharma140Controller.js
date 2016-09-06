/**
 * Dharma140Controller
 *
 * @description :: Server-side logic for managing Dharma140s
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    save: function(req, res) {
        if (req.body) {
            Dharma140.saveData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getOne: function(req, res) {

        if (req.body) {
            Dharma140.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    delete: function(req, res) {
        if (req.body) {
            if (req.body._id) {
                Dharma140.deleteData(req.body, res.callback);

            } else {
                res.json({
                    value: false,
                    data: "Please provide id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getAll: function(req, res) {
  
        if (req.body) {
            Dharma140.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getHash: function(req, res) {
      function callback(err, data) {
        var hashtag=data.hashTags;
        var users=data.user;
        Config.getTweets(hashtag, users, res.callback);
      }
      if(req.body._id){
            Dharma140.getHash(req.body, callback);
      }
    },

    findLimited: function(req, res) {
        if (req.body) {
            if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
                Dharma140.findLimited(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide parameters"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    }
};
