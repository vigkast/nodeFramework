module.exports = {

  test: function(req, res) {
    res.json({name:"Chintan"});
  },
  test2: function(req, res) {
    console.log(req.body);
    res.json({name:"chirag"});
  }

};
