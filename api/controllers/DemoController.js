module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {


    demo: function(req, res) {
      res.json({name:"Chintan"});
    }

};
module.exports = _.assign(module.exports, controller);
