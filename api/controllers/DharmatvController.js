module.exports = {

    save: function(req, res) {
        if (req.body) {
            Dharmatv.saveData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getOne: function(req, res) {

        if (req.body) {
            Dharmatv.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    delete: function(req, res) {
        if (req.body) {
            Dharmatv.deleteData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getAll: function(req, res) {
        function callback(err, data) {
            Global.response(err, data, res);
        }
        if (req.body) {
            Dharmatv.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    findLimited: function(req, res) {
        if (req.body) {
            if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
                Dharmatv.findLimited(req.body, res.callback);
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
    },

    getAllDharmatv: function(req, res) {
        if (req.body) {
            if (req.body.search && req.body.search !== "") {
                Dharmatv.getAllDharmatv(req.body, res.callback);
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
    },

    getDharmaTvHomeSlider: function(req, res) {
        if (req.body) {
            Dharmatv.getDharmaTvHomeSlider(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    changeUrl: function(req, res) {
        Dharmatv.getData({}, function(err, data2) {
            if (err) {
                console.log(err);
                res.json({
                    value: false,
                    data: err
                });
            } else {
                function callMe(num) {
                    var abc = data2[num];
                    if (abc.url && abc.url.charAt(0) == "=") {
                        console.log(abc._id);
                        abc.url = abc.url.substr(1);
                        Dharmatv.saveData({
                            _id: abc._id,
                            url: abc.url
                        }, function(err, data3) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    value: false,
                                    data: err
                                });
                            } else {
                                num++;
                                if (num == data2.length) {
                                    res.json({
                                        value: true,
                                        data: "Done"
                                    });
                                } else {
                                    callMe(num);
                                }
                            }
                        });
                    } else {
                        num++;
                        if (num == data2.length) {
                            res.json({
                                value: true,
                                data: "Done"
                            });
                        } else {
                            callMe(num);
                        }
                    }
                }
                callMe(0);
            }
        });
    }
};
