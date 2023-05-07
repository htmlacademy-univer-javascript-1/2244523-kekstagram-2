
import { getData } from './api.js';
import { getBigPopup } from './big-picture.js';
import { showCustomErrorMessage } from './error.js';
import { debounce } from './util.js';
import { showSortBlock, sortDefaultClick, sortRandomClick, sortDiscussedClick, sortInput, comparePicturesIds, comparePicturesComments } from './filters.js';
import { RERENDER_DELAY, MAX_COUNT_RANDOM_PHOTO } from './constants.js'

const picturesWrap = document.querySelector('.pictures');
const usersPhotoListFragment = document.createDocumentFragment();


const resetArray = () => {
  Array.from(picturesWrap.children).forEach((item) => {
    if (item.classList.contains('picture')) {
      item.remove();
    }
  });
};


const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const thumbnailsRandomRender = (userPhotos) => {
  userPhotos
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, MAX_COUNT_RANDOM_PHOTO)
    .forEach(({ url, likes, comments }) => {
      const photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      usersPhotoListFragment.appendChild(photoElement);
    });
  resetArray();
  picturesWrap.appendChild(usersPhotoListFragment);
  getBigPopup(userPhotos);
};


const thumbnailsRender = (userPhotos) => {
  userPhotos.slice();

  if (sortInput.value === 'default') {
    userPhotos.sort(comparePicturesIds);
  } else if (sortInput.value === 'random') {
    thumbnailsRandomRender();
  } else if (sortInput.value === 'discussed') {
    userPhotos.sort(comparePicturesComments);
  }

  userPhotos.forEach(({ url, likes, comments }) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    usersPhotoListFragment.appendChild(photoElement);
  });

  resetArray();
  picturesWrap.appendChild(usersPhotoListFragment);
  getBigPopup(userPhotos);
};


getData(
  (photos) => {
    thumbnailsRender(photos);
    showSortBlock();

    sortDefaultClick(debounce(
      () => thumbnailsRender(photos),
      RERENDER_DELAY,
    ));

    sortRandomClick(debounce(
      () => thumbnailsRandomRender(photos),
      RERENDER_DELAY,
    ));

    sortDiscussedClick(debounce(
      () => thumbnailsRender(photos),
      RERENDER_DELAY,
    ));

  },
  () => showCustomErrorMessage('Что-то пошло не так. Попробуйте перезагрузить страницу'),
);

export { thumbnailsRender, picturesWrap };