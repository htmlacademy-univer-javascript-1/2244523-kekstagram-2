<<<<<<< Updated upstream
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
=======
const getRandomPositiveInteger = (a, b) =>  {
const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
>>>>>>> Stashed changes
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
<<<<<<< Updated upstream

  const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};
=======
 

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const checkStringLength

export { getRandomPositiveInteger, getRandomArrayElement }; 



>>>>>>> Stashed changes
