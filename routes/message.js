
/*
 * POST new-message.
 */

exports.message = function(req, res){
  res.render('index', { title: req.body });
};
