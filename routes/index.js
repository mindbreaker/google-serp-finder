
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'SERP',
    description: 'Finding your search position on google'
  });
};