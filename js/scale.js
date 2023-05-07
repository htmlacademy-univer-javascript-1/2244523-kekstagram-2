import { Scale } from "./constants.js";

const imageSize = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.simg-upload__preview-img');

const toggleScaleButtons = (difference) => {
    let slideValue = Number(imageSize.value.replace('%', '')) + difference;
    slideValue = Math.min(Math.max(slideValue, Scale.MIN), Scale.MAX);
    imagePreview.style.transform = 'scale(${slideValue / 100})';
    imageSize.value = '${slideValue}%';
};

const onScaleBiggerButtonClick = () => toggleScaleButtons(Scale.STEP);
const onScaleSmallerButtonClick = () => toggleScaleButtons(-Scale.STEP);

const addEventScaleButtons = () => {
    scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
    scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
};

const removeEventScaleButtons = () => {
    scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
    scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
};

export { addEventScaleButtons, removeEventScaleButtons, onScaleBiggerButtonClick, onScaleSmallerButtonClick, scaleSmallerButton, scaleBiggerButton };