import {  debounce, getRandomArrayElement } from './util.js';
import { renderPhotos, clearPhotos } from './pictures.js';
import { getPhotos } from './main.js';
import {MAX_COUNT_RANDOM_PHOTO} from './constants.js'

const filterForm = document.querySelector('.img-filters__form');
const filters = {
  'filter-default': () => getPhotos().slice(),
  'filter-random': () => getRandomArrayElement(getPhotos(), MAX_COUNT_RANDOM_PHOTO),
  'filter-discussed': () => getPhotos().slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length),
};

const onFilterFormClick = debounce((evt) => {
  if(evt.target.tagName === 'BUTTON') {
    const selectedButton = filterForm.querySelector('.img-filters__button--active');

    if(selectedButton){
      selectedButton.classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');

    clearPhotos();
    renderPhotos(filters[evt.target.id]());
  }
});

filterForm.addEventListener('click', onFilterFormClick);