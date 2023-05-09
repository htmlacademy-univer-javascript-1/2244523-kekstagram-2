const getData = (onSuccess, onError) => {
    fetch('https://26.javascript.pages.academy/kekstagram/data')
      .then((response) => response.json())
      .then((photos) => {
        onSuccess(photos);
      })
      .catch(() => {
        onError('Произошла ошибка. Не удалось загрузить данные.');
      });
  };
  
  const sendRequest = (onSuccess, onFail, body) => {
    fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail('Не удалось. Попробуйте еще раз.');
        }
      })
      .catch(() => {
        onFail('Не удалось. Попробуйте ещё раз');
      });
  };
  
  export { getData, sendRequest };