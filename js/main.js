const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const COMMENTS_ID = [];

const MESSAGES = [
'Всё отлично!',
'В целом всё неплохо.Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
'В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают.',
'Как можно было поймать такой неудачный момент?!',
]

const NAMES = [
'Уилл',
'Томми',
'Фил',
'Алекс',
'Джеймс',
'Эш',
'Марк',
'Джо',
'Чарли',
]


const COMMENTS = () => {
const randomIdIndex = getCommentId();
const randomAvatarIndex = getRandomPositiveInteger(1,6);
const randomMessageIndex = getRandomArrayElement(MESSAGES);
const randomNameIndex = getRandomArrayElement(NAMES);

return {
  id: randomIdIndex,
  avatar: 'img/avatar-' + randomAvatarIndex + '.svg',
  message: randomMessageIndex,
  name: randomNameIndex,
}
}

const getId = (() => {
let id = 1;
return () => id++;
})()

const getCommentId = () => {
let id = getRandomPositiveInteger(1,100);
while (COMMENTS_ID.includes(id)) {
  id = getRandomPositiveInteger(1,100);
}
return id
}
const getUrl = (() => {
let url = 1;
return () => id++;
})()

const createPhoto = () => {
const randomIdIndex = getId();
const randomUrlIndex = getUrl();
const randomLikesIndex = getRandomPositiveInteger(15,200);
const randomCommentIndex =  getRandomPositiveInteger(0, COMMENTS.length - 1);

return {
id: randomIdIndex,
url: 'photos/' + randomUrlIndex + '.jpg',
description: 'Это я ездил к бабушке, сейчас уже дома',
likes: randomLikesIndex,
comments: COMMENTS(randomCommentIndex),
}
}
const photoDescriptions = Array.from({length: 25}, createPhoto);

console.log(photoDescriptions);