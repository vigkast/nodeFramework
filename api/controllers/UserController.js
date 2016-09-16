module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    loginFacebook: function(req, res) {
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    loginGoogle: function(req, res) {
        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    }
};
module.exports = _.assign(module.exports, controller);