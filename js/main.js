
  import '.data.js'
  import '.util.js'
  import '.pictures.js'



const getId = (() => {
let id = 1;
return () => id++;
})()

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

console.log(createPhoto);

