import {createBigPhoto} from './big-photo.js';

const miniaturesFragment = document.createDocumentFragment();
const miniaturesList = document.querySelector('.pictures');
const miniaturesTemplate = document.querySelector('#picture').content.querySelector('a');
const createMiniatures = (description) => {
  description
    .forEach((photo)=>{
      const miniatures = miniaturesTemplate.cloneNode(true);
      const miniaturesImg = miniatures.querySelector('.picture__img');
      miniaturesImg.src = photo.url;
      miniatures.querySelector('.picture__likes').textContent=photo.likes;
      miniatures.querySelector('.picture__comments').textContent=photo.comments.length;
      miniaturesFragment.appendChild(miniatures);
      miniaturesImg.addEventListener('click', (evt) => {
        evt.preventDefault();
        createBigPhoto(miniatures, photo.description, photo.likes, photo.comments);
      });
    });
  miniaturesList.appendChild(miniaturesFragment);
};

export {createMiniatures};
