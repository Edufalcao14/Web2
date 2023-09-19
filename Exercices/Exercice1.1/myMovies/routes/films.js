var express = require('express');
var router = express.Router();

const catalogue_films = [
    {
      id: 1,
      title: 'Django Unchained',
      duration: 2.30,
      budget: 5000000,
      link: 'https://www.imdb.com/title/tt1853728/'
    },
    {
      id: 2,
      title: 'The Wolf of Wall Street',
      duration: 2.50,
      budget: 10000000,
      link: 'https://www.imdb.com/title/tt0993846/'
    },
    {
      id: 3,
      title: 'Scarface',
      duration: 3.10,
      budget: 10000000,
      link: 'https://www.imdb.com/title/tt0086250/'
    },
    
  ];
/* GET home page. */
router.get('/', function(req, res, next) {

        console.log('Get /films');
    res.json(catalogue_films);
  });

module.exports = router;
