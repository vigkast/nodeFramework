module.exports = function(data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    if (!sails.config.host) {
        sails.config.host = "http://localhost";
    }
    if (sails.config.environment == "production") {
        sails.config.host = "http://104.154.89.21";
    }
    res.view(sails.config.environment, {
        jsFiles: jsFiles,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        adminurl: sails.config.host + ":" + sails.config.port + "/api/",
        image: sails.config.host + ":" + sails.config.port + "/api/upload/readFile?file=" + data.image,
        url: sails.config.host + ":" + sails.config.port + req.path,

    });
};
