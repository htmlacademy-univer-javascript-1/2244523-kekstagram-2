const STEP= 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

inputScale.value= `${100 }%`;


function clickSmallerButton (){
  smallerButton.addEventListener('click',() => {
    let newValue = inputScale.value.replace('%', '');
    newValue = newValue - STEP;
    if (newValue >= SCALE_VALUE_MIN){ inputScale.value = `${newValue}%`;
      imgPreview.style.transform = `scale(0.${newValue})`;
    }
  });
}
clickSmallerButton();

function clickBiggerButton() {
  biggerButton.addEventListener('click', () => {
    let newValue = inputScale.value.replace('%', '');
    newValue = Number( newValue) + STEP;
    if (Number(newValue) < SCALE_VALUE_MAX) {
      inputScale.value = `${newValue}%`;
      imgPreview.style.transform = `scale(0.${newValue})`;
    }
    if (Number(newValue) === SCALE_VALUE_MAX) { inputScale.value = `${newValue}%`;
      imgPreview.style.transform = 'scale(1.0)';
    }
  });
}
clickBiggerButton();