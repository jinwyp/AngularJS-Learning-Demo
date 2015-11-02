var express = require('express');
var router = express.Router();


var movieController = require('../controllers/movie.js');




/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/angulardemo');
});

router.get('/angulardemo', function(req, res, next) {
  res.render('angulardemo/index', { title: 'Express' });
});

router.get('/angulardemo/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});



router.get('/api/movie', movieController.campaignSingleInfo);
router.get('/api/movieadd', movieController.addCampaign);



module.exports = router;