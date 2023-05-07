import { isEscape } from './util.js';


const errorContainerTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const successContainerTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


const showErrorMessage = () => {
  const errorContainer = errorContainerTemplate.cloneNode(true);
  const errorCloseButton = errorContainer.querySelector('.error__button');

  errorContainer.style.zIndex = '100';

  document.body.append(errorContainer);

  const onPopupEscKeydown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      onCloseAlertClick();
    }
  };

  const onOutBoxClick = (evt) => {
    if (!errorContainer.querySelector('.error__inner').contains(evt.target)) {
      evt.preventDefault();
      onCloseAlertClick();
    }
  };

  function onCloseAlertClick() {
    errorContainer.remove();
    errorCloseButton.removeEventListener('click', onCloseAlertClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onOutBoxClick);
  }

  errorCloseButton.addEventListener('click', onCloseAlertClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onOutBoxClick);

  setTimeout(() => {
    errorContainer.remove();
  }, ALERT_SHOW_TIME);
};


const showSuccessMessage = () => {
  const successContainer = successContainerTemplate.cloneNode(true);
  const successCloseButton = successContainer.querySelector('.success__button');

  successContainer.style.zIndex = '100';

  document.body.append(successContainer);

  const onPopupEscKeydown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      onCloseMessageClick();
    }
  };

  const onOutBoxClick = (evt) => {
    if (!successContainer.querySelector('.success__inner').contains(evt.target)) {
      evt.preventDefault();
      onCloseMessageClick();
    }
  };

  function onCloseMessageClick() {
    successContainer.remove();
    successCloseButton.removeEventListener('click', onCloseMessageClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onOutBoxClick);
  }

  successCloseButton.addEventListener('click', onCloseMessageClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onOutBoxClick);
};

export { showErrorMessage, showSuccessMessage };