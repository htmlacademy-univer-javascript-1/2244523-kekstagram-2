import {showAlert} from './util.js';

const Urls = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram',
};

const getData = (onSuccess) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => { showAlert('Ошибка загрузки данных');});
};

const sendData = (onSuccess, onFail, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось опубликовать');
    }
  })
    .catch(() => onFail('Не удалось опубликовать'));
};

export {getData, sendData};
