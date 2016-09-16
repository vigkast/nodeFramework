module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    loginFacebook: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email']
        }, callback)(req, res);
    },
    loginGoogle: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email']
        }, callback)(req, res);
    },
    loginGoogleCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                res.json(null, data);
            }
        };
        passport.authenticate('google', {
            failureRedirect: '/'
        }, callback)(req, res);
    },
};
module.exports = _.assign(module.exports, controller);