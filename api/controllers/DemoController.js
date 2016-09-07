module.exports = {
    demo: function(req, res) {
        res.json(req.body);
        console.log(req.body);
    }
};
