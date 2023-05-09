import { SCALE_DEFAULT } from "./constants.js";

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const previewPhoto = document.querySelector('.img-upload__preview');

let photoScaleValue = SCALE_DEFAULT;

const setScale = () => (previewPhoto.style['transform'] = `scale(${photoScaleValue/100})`);

const onScaleSmallerClick = () => {
  if (photoScaleValue === 25) {
    return;
  }

  photoScaleValue = photoScaleValue - STEP;
  scaleValue.value =`${photoScaleValue}%`;
  setScale();
};

const onScaleBiggerClick = () => {
  if (photoScaleValue === 100) {
    return;
  }

  photoScaleValue = photoScaleValue + STEP;
  scaleValue.value = `${photoScaleValue}%`;
  setScale();
};

const reloadScale = () => {
  photoScaleValue = SCALE_DEFAULT;
  scaleValue.value =`${photoScaleValue}%`;
  setScale();
};

scaleSmallerBtn.addEventListener('click', onScaleSmallerClick);
scaleBiggerBtn.addEventListener('click', onScaleBiggerClick);

export {reloadScale};



