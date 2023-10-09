const path = require('node:path');
const { parse, serialize } = require('../utils/json');

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

function readAllFilms(orderBy) {
    const orderByTitle = orderBy?.includes('title') ? orderBy : undefined;
    let orderedCatalogue;
    const films = parse(jsonDbPath, catalogueFilms);
    if (orderByTitle)
    orderedCatalogue = [...films].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTitle === '-title') orderedCatalogue = orderedCatalogue.reverse();
  
    const allFilmsPotentiallyOrderd = orderedCatalogue ?? films;
    return allFilmsPotentiallyOrderd;
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, catalogueFilms);
  const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath, catalogueFilms);

  const newMovie = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };

  films.push(newMovie);

  serialize(jsonDbPath, films);

  return newMovie;
}

function getNextId() {
  const films = parse(jsonDbPath, catalogueFilms);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, catalogueFilms);
  const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedfilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedfilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, catalogueFilms);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
