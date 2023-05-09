import './../nouislider/nouislider.js';

import { sliderElementBlock, sliderElement, effectLevelValue, imgUploadPreview } from './slider.js';
import { isEscape } from './util.js';
import { sendData } from './api.js';
import { fileChooser } from './new-photo.js';
import { showErrorMessage, showSuccessMessage } from './error.js';
import { hashtagValidate, commentValidate, hashtags, commentField, imageLoad, onHashtagsTextInput, commentTextInput } from './validate.js';
import { scaleControlSmallerButton, scaleControlBiggerButton, scaleControlValue, scaleValueHidden, onScaleSmallerClick, onScaleBiggerClick } from './scale.js';

const formUploadImage = document.querySelector('.img-upload__form');
const modalView = document.querySelector('body');
const buttonModalClose = document.querySelector('.img-upload__cancel');



const scaleChange = () => {
  scaleControlSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleControlBiggerButton.addEventListener('click', onScaleBiggerClick);
};


formUploadImage.addEventListener('change', () => {
  openFormPopup();
});


function openFormPopup() {
  imageLoad.classList.remove('hidden');
  modalView.classList.add('modal-open');
  scaleChange();
  hashtagValidate();
  commentValidate();
}


buttonModalClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeFormPopup();
});


function closeFormPopup() {
  modalView.classList.remove('modal-open');
  imageLoad.classList.add('hidden');
  
  scaleControlSmallerButton.removeEventListener('click', onScaleSmallerClick);
  scaleControlBiggerButton.removeEventListener('click', onScaleBiggerClick);
  hashtags.removeEventListener('input', onHashtagsTextInput);
  commentField.addEventListener('input', commentTextInput);
  
  fileChooser.value = '';
  scaleValueHidden.value = '100';
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
  
  sliderElementBlock.style.display = 'none';
  sliderElement.style.display = 'none';
  effectLevelValue.value = '';
  imgUploadPreview.style.filter = 'none';
  
  hashtags.value = '';
  commentField.value = '';
}


window.addEventListener('keydown', (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeFormPopup();
  }
  window.removeEventListener('keydown', closeFormPopup);
});


const setImgUploadFormSubmit = (onSuccess) => {
  formUploadImage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showSuccessMessage('Форма успешно отправлена'),
      () => showErrorMessage('При отправке формы возникла ошибка'),
      () => onSuccess(),
      new FormData(evt.target),
    );
  });
};

setImgUploadFormSubmit(closeFormPopup);

export { formUploadImage, imageLoad, imgUploadPreview };