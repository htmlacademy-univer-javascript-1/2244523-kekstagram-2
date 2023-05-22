const ALERT_SHOW_TIME=3000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

import {inputHashtags, hashtagsValid, inputComments, isAmountValid, isEveryHashtagSymbolsValid, areHashtagsUnique, commentLength} from './validation-form.js';
import {showAlert, blockSubmitButton, unblockSubmitButton} from './util.js';
import {sliderElement} from './photo-filter.js';
import {sendData} from './api.js';

const imgOverlay = document.querySelector('.img-upload__overlay');
const start = document.querySelector('.img-upload__start input');
const photoUser = document.querySelector('#upload-file');
const body=document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const miniatures = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    miniatures.forEach((miniature) => {
      miniature.style.backgroundImage = `url(${preview.src})`;
    });
  }
});

start.onchange = function () {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.querySelector('.scale__control--value').value = `${100}%`;
};

function closeWindow(){
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  sliderElement.classList.add('hidden');
  document.querySelector('.img-upload__preview img').style.filter = '';
  document.getElementById('effect-none').checked = true;
  document.querySelector('.img-upload__preview').style.transform='scale(1)';
  document.querySelector('.scale__control--value').value = `${100}%`;
  inputHashtags.value ='';
  inputComments.value ='';
  document.querySelectorAll('.pristine-error').forEach((e) => {e.innerHTML  = '';});
}

const cancel = document.querySelector('.img-upload__cancel');
cancel.addEventListener('click', () => {
  closeWindow();
  photoUser.value ='';
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow();
    photoUser.value = '';
  }
});


const showSuccessMessageModal = () => {
  const successModal = document.querySelector('#success').content.querySelector('.success');
  const clonedSuccessModal = successModal.cloneNode(true);
  const closeSuccessModalButtonElement = clonedSuccessModal.querySelector('.success__button');

  closeSuccessModalButtonElement.addEventListener('click',(evt) =>{
    evt.preventDefault();
    body.removeChild(clonedSuccessModal);

  } );

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clonedSuccessModal.remove();
    }
  });

  document.addEventListener('click',()  => {
    clonedSuccessModal.remove();
  });
  document.body.append(clonedSuccessModal);
};


const showErrorMessageModal = () =>{
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const clonedErrorModal = errorModal.cloneNode(true);
  const closeErrorModalButtonElement = clonedErrorModal.querySelector('.error__button');
  closeErrorModalButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(clonedErrorModal);
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clonedErrorModal.remove();
    }
  });
  document.addEventListener('click', () => {
    clonedErrorModal.remove();
  });
  document.body.append(clonedErrorModal);
  clonedErrorModal.style.zIndex = '100';
  setTimeout(() => {
    clonedErrorModal.remove();
  }, ALERT_SHOW_TIME);
};

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
}, true);

pristine.addValidator(document.querySelector('[name="hashtags"]'), hashtagsValid);

const formValidateCheck = () => {
  pristine.addValidator(inputHashtags, isEveryHashtagSymbolsValid, 'Хэш-тег должен начинается с символа # и состоять из букв или чисел, без пробелов и спецсимволов. Максимальная длина одного хэш-тега 20 символов, включая решётку');
  pristine.addValidator(inputHashtags, areHashtagsUnique, 'Хэш-теги не должны повторяться');
  pristine.addValidator(inputHashtags, isAmountValid, 'Хэш-тегов не должно быть больше 5');
  pristine.addValidator(inputHashtags, commentLength, 'Длина комментария не может составлять больше 140 символов');
};
formValidateCheck();

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (inputHashtags.value === '' || pristine.validate() ) {
    blockSubmitButton(submitButton);
    sendData(
      () =>{ closeWindow(); showSuccessMessageModal();unblockSubmitButton(submitButton);},
      () => { showAlert('Не удалось отправить форму. Попробуйте ещё раз'); showErrorMessageModal(); unblockSubmitButton(submitButton);},
      new FormData(evt.target),
    );
    photoUser.value = '';
    inputHashtags.value = '';
    inputComments.value = '';
  }
  else {
    showErrorMessageModal();
  }
});
