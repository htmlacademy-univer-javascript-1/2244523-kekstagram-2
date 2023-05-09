import { openBigPhoto } from './big-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const element= pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent=photo.likes;
  element.querySelector('.picture__comments').textContent=photo.comments.length;

  openBigPhoto(element,photo);
  return element;
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });
  pictures.appendChild(fragment);
};

const clearPhotos = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

export {renderPhotos, clearPhotos};