const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const catalogueFilms = [
  {
    id: 1,
    title: 'Django Unchained',
    duration: 190,
    budget: 3000000,
    link: 'https://www.imdb.com/title/tt1853728/',
  },
  {
    id: 2,
    title: 'The Wolf of Wall Street',
    duration: 210,
    budget: 5000000,
    link: 'https://www.imdb.com/title/tt0993846/',
  },
  {
    id: 3,
    title: 'Scarface',
    duration: 160,
    budget: 10000000,
    link: 'https://www.imdb.com/title/tt0086250/',
  },
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const duration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;
  const startsWith = req?.query?.['starts-with'] ? req.query['starts-with'] : undefined;
  const order = req?.query?.order ? req.query.order : undefined;

  let orderedCatalogue;
  const films = parse(jsonDbPath, catalogueFilms);

  // Order Film List by title
  if (order === 'title' || order === '-title') {
    orderedCatalogue = [...films].sort((a, b) => a.title.localeCompare(b.title));
    if (order === '-title') orderedCatalogue = orderedCatalogue.reverse();

    return res.json(orderedCatalogue);
  }

  // Order Film List by duration
  if (order === 'durationMin' || order === 'durationMax') {
    orderedCatalogue = [...films].sort((a, b) => a.duration - b.duration);
    if (order === 'durationMax') orderedCatalogue = orderedCatalogue.reverse();

    return res.json(orderedCatalogue);
  }

  // duration filter
  if (duration !== undefined) {
    if (Number.isNaN(duration) || duration < 0) {
      return res.sendStatus(400);
    }
    orderedCatalogue = [...films].filter((film) => film.duration >= duration);

    return res.json(orderedCatalogue);
  }
  // Character Filter
  if (startsWith !== undefined && startsWith.length > 0) {

    orderedCatalogue = [...films].filter(filme => filme.title.startsWith(startsWith));

    return res.json(orderedCatalogue);
  }

  return res.json(films);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const pizzas = parse(jsonDbPath, catalogueFilms);
  const idInRequest = parseInt(req.params.id, 10);
  const indexOfPizzaFound = pizzas.findIndex((pizza) => pizza.id === idInRequest);

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  return res.json(pizzas[indexOfPizzaFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'



  const movies = parse(jsonDbPath, catalogueFilms);

  const lastItemIndex = movies?.length !== 0 ? movies.length - 1 : undefined;
  const lastId = lastItemIndex ? movies[lastItemIndex]?.id : undefined;
  const nextId = lastItemIndex !== 0 ? lastId + 1 : 1;

  const existingFilm = movies.find(film => film.title.toLowerCase() === title.toLowerCase());
  if (existingFilm) return res.status(409).json({ erreur: 'Le film existe dèja.' });

  const newMovie = {
    id: nextId,
    title,
    duration,
    budget,
    link
  };

  movies.push(newMovie);

  serialize(jsonDbPath, movies);

  return res.json(newMovie);
});

// Delete a pizza from the catalogueFilms based on its id
router.delete('/:id', (req, res) => {
  const movies = parse(jsonDbPath, catalogueFilms);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = movies.findIndex((movie) => movie.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = movies.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, movies);

  return res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'


  const movies = parse(jsonDbPath, catalogueFilms);
  const idInRequest = parseInt(req.params.id, 10);
  const foundIndex = movies.findIndex((movie) => movie.id === idInRequest);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedMovie = { ...movies[foundIndex], ...req.body };

  movies[foundIndex] = updatedMovie;

  serialize(jsonDbPath, movies);

  return res.json(updatedMovie);
});

module.exports = router;
