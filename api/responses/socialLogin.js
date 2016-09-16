module.exports = function(profile) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (_.isEmpty(profile)) {
        res.callback("Error fetching profile in Social Login", profile);
    } else {
        User.existsSocial(profile, res.callback);
    }
};