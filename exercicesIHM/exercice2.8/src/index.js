/* eslint-disable no-shadow */
/* eslint-disable import/newline-after-import */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import  djangoImage from './img/django.jpg';
import once from './img/once.jpg';
import inglorius from './img/inglorius.jpg';
const container = document.getElementById("container");


const filmsCatalogue = [
    {
      id: 1,
      title: 'Django Unchained',
      duration: 190,
      budget: 3000000,
      link: 'https://www.imdb.com/title/tt1853728/',
      photoUrl: djangoImage
    },
    {
      id: 2,
      title: 'Once upon a time in hollywood',
      duration: 210,
      budget: 5000000,
      link: 'https://www.imdb.com/title/tt0993846/',
      photoUrl: once
    },
    {
      id: 3,
      title: 'Inglorius Basterds',
      duration: 160,
      budget: 10000000,
      link: 'https://www.imdb.com/title/tt0086250/',
      photoUrl: inglorius
    },
  ];
  renderCardsFromString(filmsCatalogue);

  function renderCardsFromString(films) {
    const main =document.getElementById('container');
    let filmsCards = '';
  
    films?.forEach((film) => {
        filmsCards = `
        <div class="container mt-1 align-items-cente  ">
        <div class="card" style="width: 18rem;">
          <img src=${film.photoUrl} class="card-img-top" alt="Placeholder Image">
          <div class="card-body">
            
            <h5 class="card-title">${film.title}</h5>
            <p class="card-text">${film.duration} min</p>
          </div>
          <div class="card-body d-flex p-2 justify-content-around">
            <a href="#" class="card-link c">Trailer</a>
            <a href="#" class="card-link">More</a>
          </div>
        </div>
      </div>
        `;
        main.innerHTML+= filmsCards;
    });
}