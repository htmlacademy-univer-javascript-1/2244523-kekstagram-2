import {getRandomPositiveInteger} from './util.js';

const PHOTOS_COUNT = 25;
const NAMES = ['Фил', 'Уильям', 'Томас', 'Алекс', 'Ян', 'Мирон'];
const DESCRIPTIONS = ['Когда Бог будет судить меня за грех, не буду ли я вознагражден за то, что заставил его покраснеть', 'У нас с тобой так много общего, например, мы оба не имеем друг с другом ничего общего', 'А что плохо что ли? Хорошо же и волнительно как-то получается', 'Доброе утро, Сыктывкар'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо, но не все.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


function getRandomLikes() {
  const likes = getRandomPositiveInteger(15, 200);
  return likes;
}

function getRandomElement(arr) {
  const element = arr[getRandomPositiveInteger(0, arr.length - 1)];
  return element;
}

function getCommentId() {
  const id = getRandomPositiveInteger (1, 25);
  return id;
}


function generateComment() {
  const messageText = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 2); i++) {
    messageText.push(getRandomElement(MESSAGES));
  }

  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: messageText.join(''),
    name: getRandomElement(NAMES)
  };
}

function generateDescription() {
  const comments = Array.from({length: getRandomPositiveInteger(0, 7)}, generateComment);
  const id = getCommentId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomLikes(),
    comments: comments
  };
}

const description = Array.from({length: PHOTOS_COUNT}, generateDescription);

export {description};
