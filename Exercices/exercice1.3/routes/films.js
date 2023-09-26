var express = require('express');
var router = express.Router();

const catalogue_films = [
  {
    id: 1,
    title: 'Django Unchained',
    duration: 190,
    budget: 5000000,
    link: 'https://www.imdb.com/title/tt1853728/'
  },
  {
    id: 2,
    title: 'The Wolf of Wall Street',
    duration: 210,
    budget: 10000000,
    link: 'https://www.imdb.com/title/tt0993846/'
  },
  {
    id: 3,
    title: 'Scarface',
    duration: 160,
    budget: 10000000,
    link: 'https://www.imdb.com/title/tt0086250/'
  },

];
/* GET home page. */
router.get('/', (req, res, next) => {
    const duration = req?.query?.['minimum-duration'] > 0 ? Number(req.query['minimum-duration']) : undefined;
  if (duration==undefined){
  console.log('GET /films'); 
  return res.json(catalogue_films); //return tableau non triée
  }

 const orderedCatalogue = [...catalogue_films].filter(filme => filme.duration >= duration);

  console.log('GET /films');
  res.json(orderedCatalogue);
});



router.get('/:id', (req, res, next) => {
  console.log(`GET /pizzas/${req.params.id}`);

  const indexOfFIlmFound = catalogue_films.findIndex((film) => film.id == req.params.id);

  if(indexOfFIlmFound < 0 ) return res.sendStatus(404);

res.json(catalogue_films[indexOfFIlmFound])
});

router.post('/', (req, res, next) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

if(!title || !duration || !budget || !link) return res.sendStatus(400);

const lastItemIndex = catalogue_films?.length !== 0 ? catalogue_films.length -1 : undefined;
const lastId = lastItemIndex !== undefined ? catalogue_films[lastItemIndex]?.id : 0;
const nextId = lastId +1;

const newFilm = {
  id: nextId,
  title: title,
  duration: duration,
  budget: budget,
  link: link
}
catalogue_films.push(newFilm);
res.json(newFilm);
});

module.exports = router;
