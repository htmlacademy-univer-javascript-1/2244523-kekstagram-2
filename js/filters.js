const RERENDER_DELAY = 500;

import {createRandom} from './util.js';
import {createMiniatures} from './photo-miniature.js';
import {debounce} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const filterContainer = document.querySelector('.img-filters');
const filterButtons = [...document.querySelectorAll('.img-filters__button')];

function buttonFilterClick() {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target && target.matches('.img-filters__button')) {
      filterButtons.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
    }
  });
}
buttonFilterClick();

const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');


function generateArray(length){
  return [...new Array(length)].map(createRandom(0,24));
}

function createRandomPhotos(photos) {const arrayIndexPhotos = generateArray(10);
  const resultRandomPhoto=[];
  for (let i = 0; i < arrayIndexPhotos.length; i++) {
    for (let j = 0; j < photos.length; j++) {
      if (arrayIndexPhotos[i] === photos[j].id) {
        resultRandomPhoto.push(photos[j]);
      }
    }
  }
  return resultRandomPhoto;
}

function createDefaultPhotos (photos) {
  return photos;
}

function createDiscussedPhotos(photos) {
  const arrayCopyPhotos = photos.slice();
  arrayCopyPhotos.sort((a, b) => b.comments > a.comments ? 1 : -1);
  return arrayCopyPhotos;
}

function clearMiniaturesList() {
  pictureContainer.querySelectorAll('.picture').forEach((p) => p.remove());
}
function callback (cb){
  clearMiniaturesList();
  createMiniatures(cb);
}

const sort = (description) => {
  buttonRandom.addEventListener('click', debounce(() => callback(createRandomPhotos(description)), RERENDER_DELAY));
  buttonDefault.addEventListener('click', debounce(() => callback(createDefaultPhotos(description)), RERENDER_DELAY));
  buttonDiscussed.addEventListener('click', debounce(() => callback(createDiscussedPhotos(description)), RERENDER_DELAY));};

export{createRandomPhotos,createDefaultPhotos,createDiscussedPhotos,clearMiniaturesList,sort};
