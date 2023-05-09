import { isEscape } from './util.js';
import { onFormInput, refreshPrinstine } from './validate.js';
import { reloadScale } from './scale.js';
import { setDefaultEffects } from './slider.js';

const imgUploadFileInput=document.querySelector('.img-upload__input');
const form=document.querySelector('.img-upload__form');
const overlay=document.querySelector('.img-upload__overlay');
const closingButton = document.querySelector('#upload-cancel');

const isNoFocus = (evt) => !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description') ;

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadFileInput.value='';

  refreshPrinstine();
  form.reset();
  form.removeEventListener('submit', onFormInput);
};
const onClosingButtonClick =() => {
  closeForm();
  closingButton.removeEventListener('click', onClosingButtonClick);
};
const onEscKeyDown = (evt) => {
  if (isEscape(evt) && isNoFocus(evt)){
    closeForm();
    closingButton.removeEventListener('click', onClosingButtonClick);
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const onFileInput = () => {
  reloadScale();
  setDefaultEffects();

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closingButton.addEventListener('click', onClosingButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  form.addEventListener('submit', onFormInput);
};

imgUploadFileInput.addEventListener('input', onFileInput);

export{onEscKeyDown, closeForm};