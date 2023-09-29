var express = require('express');
var router = express.Router();

const catalogue_films = [
  {
    id: 1,
    title: 'Django Unchained',
    duration: 190,
    budget: 3000000,
    link: 'https://www.imdb.com/title/tt1853728/'
  },
  {
    id: 2,
    title: 'The Wolf of Wall Street',
    duration: 210,
    budget: 5000000,
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

  const duration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;
  const startsWith = req?.query?.['starts-with'] ? req.query['starts-with'] : undefined;
  const order = req?.query?.order ? req.query.order : undefined;



  let orderedCatalogue = [...catalogue_films];

  // no filters -> return no filtered table
  if (duration == undefined && startsWith == undefined && order == undefined) {

    console.log('GET /films');

    res.json(catalogue_films);
  }
  // Order Film List by title
  if (order === 'title' || order === '-title') {

    orderedCatalogue = orderedCatalogue.sort((a, b) => a.title.localeCompare(b.title));
    if (order === '-title') orderedCatalogue = orderedCatalogue.reverse();

    res.json(orderedCatalogue);
  }

  // Order Film List by duration
  if (order === 'durationMin' || order === 'durationMax') {

    orderedCatalogue = orderedCatalogue.sort((a, b) => a.duration - b.duration);
    if (order === 'durationMax') orderedCatalogue = orderedCatalogue.reverse();

    res.json(orderedCatalogue);
  }

  // duration filter
  if (duration !== undefined) {
    if (isNaN(duration) || duration < 0) {

      return res.sendStatus(400);

    } else {

      orderedCatalogue = orderedCatalogue.filter(film => film.duration >= duration);
      console.log('GET /films');

      res.json(orderedCatalogue);
    }
  }
  // Character Filter
  if (startsWith !== undefined && startsWith.length > 0) {

    orderedCatalogue = orderedCatalogue.filter(filme => filme.title.startsWith(startsWith));
    console.log('GET /films');

    res.json(orderedCatalogue);
  }
});



router.get('/:id', (req, res, next) => {
  console.log(`GET /films/${req.params.id}`);

  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(400);

  const indexOfFIlmFound = catalogue_films.findIndex((film) => film.id == req.params.id);

  if (indexOfFIlmFound < 0 || catalogue_films.findIndex[indexOfFIlmFound] === null) return res.sendStatus(404);


  res.json(catalogue_films[indexOfFIlmFound])
});

router.post('/', (req, res, next) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const lastItemIndex = catalogue_films?.length !== 0 ? catalogue_films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? catalogue_films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const existingFilm = catalogue_films.find(film => film.title.toLowerCase() === title.toLowerCase());
  if (existingFilm) return res.status(409).json({ erreur: 'Le film existe dèja.' });

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

//Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films /${req.params.id}`);

  const foundIndex = catalogue_films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0 || catalogue_films.findIndex[foundIndex] === null) return res.sendStatus(404);

  const itemsRemovedFromMenu = catalogue_films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  res.json(itemRemoved);
});
// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('POST /pizzas');

  if ((!title && !duration && !budget && !link) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0)
    return res.sendStatus(400);
  const foundIndex = catalogue_films.findIndex(films => films.id == req.params.id);

  if (foundIndex < 0 || catalogue_films.findIndex[foundIndex] === null) return res.status(404).json({ error: 'The movie passed in param doesnt exist' });

  const updatedFilm = {
    id: catalogue_films[foundIndex].id,
    title: req.body.title,
    budget: req.body.budget,
    link: req.body.link
  };
  //const updatedFilm = {...catalogue_films[foundIndex], ...req.body}; Façon plus simple à faire.

  catalogue_films[foundIndex] = updatedFilm;

  res.json(updatedFilm);
});
router.put('/:id', (req, res) => {
  console.log(`PUT /films /${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if ((!title && !duration && !budget && !link) || title?.length === 0 || duration <= 0 || budget <= 0 || link?.length === 0)
    return res.sendStatus(400);
  const foundIndex = catalogue_films.findIndex(films => films.id == req.params.id);

  if (foundIndex < 0) {

    const lastItemIndex = catalogue_films?.length !== 0 ? catalogue_films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? catalogue_films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;


    const newFilm = {
      id: nextId,
      title: req.body.title,
      budget: req.body.budget,
      link: req.body.link
    };
    catalogue_films.push(newFilm);

    return res.json(newFilm)
  } else {

    const updatedFilm = {
      id: catalogue_films[foundIndex].id,
      title: req.body.title,
      budget: req.body.budget,
      link: req.body.link
    };
    //const updatedFilm = {...catalogue_films[foundIndex], ...req.body}; Façon plus simple à faire.

    catalogue_films[foundIndex] = updatedFilm;

    res.json(updatedFilm);
  }
});

module.exports = router;
