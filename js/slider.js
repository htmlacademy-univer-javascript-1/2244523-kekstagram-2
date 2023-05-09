
const Effect ={
  MAX_CHROME_VALUE:1,
  MAX_SEPIA_VALUE:1,
  MAX_INVERT_VALUE:100,
  MAX_BLUR_VALUE:3,
  MAX_BRIGHTNESS_VALUE:3,
  RADIX:10,

  STEP:0.01,
  INVERT_STEP:1
};

const Slider = {
  MIN:0,
  MAX:100,
  STEP:1
};

const form=document.querySelector('.img-upload__form');
const overlay=document.querySelector('.img-upload__overlay');
const imagePreview=overlay.querySelector('.img-upload__preview');
const slider=form.querySelector('.effect-level__slider');
const effectsList=form.querySelector('.effects__list');
const image=imagePreview.querySelector('img');
const effectLevelField=form.querySelector('.img-upload__effect-level');
const defaultImageClass = image.classList[0];


let effectLevelValue=form.querySelector('.effect-level__value').value;
let currentEffect = '';


noUiSlider.create(slider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});


const effects = {
  none: () => {
    effectLevelField.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    effectLevelField.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue,Effect.RADIX)*Effect.STEP})`;
  },
  sepia: () => {
    effectLevelField.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue,Effect.RADIX)*Effect.STEP})`;
  },
  marvin: () => {
    effectLevelField.classList.remove('visually-hidden');
    return `invert(${parseInt(effectLevelValue,Effect.RADIX)*Effect.INVERT_STEP}%)`;
  },
  phobos: () => {
    effectLevelField.classList.remove('visually-hidden');
    return `blur(${parseInt(effectLevelValue,Effect.RADIX)*Effect.STEP*Effect.MAX_BLUR_VALUE}px)`;
  },
  heat: () => {
    effectLevelField.classList.remove('visually-hidden');
    const effectMin = Slider.MAX / (Effect.MAX_BRIGHTNESS_VALUE - 1);
    return `brightness(${(effectMin + parseInt(effectLevelValue, Effect.RADIX))*Effect.STEP*(Effect.MAX_BRIGHTNESS_VALUE-1)})`;
  }
};

const setDefaultEffects = () => {
  effectLevelField.classList.add('visually-hidden');
  image.className=defaultImageClass;
  image.style.filter=effects.none;
};

const setEffect = (effect) => {
  image.style.filter=effects[effect.replace('effects__preview--','')]();
};

const onEffectsClick = (evt) => {
  let target=evt.target;
  if (target.classList.contains('effects__label')){
    target=evt.target.querySelector('span');
  }
  if (target.classList.contains('effects__preview')){
    if(currentEffect !== ''){
      image.classList.remove(currentEffect);
    }
    slider.noUiSlider.set(Slider.MAX);
    effectLevelValue = Slider.MAX;
    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
    setEffect(currentEffect);
  }
};
const onSliderElementChange =() => {
  effectLevelValue=slider.noUiSlider.get();
  setEffect(currentEffect);
};

slider.noUiSlider.on('change',onSliderElementChange);
effectsList.addEventListener('click', onEffectsClick);

export {setDefaultEffects};