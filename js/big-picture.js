import { isEscape } from './util.js';
import { STEP_ADDED_COMMENTS } from './constants.js'

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const comments = bigPicture.querySelector('.social__comments');

const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const commentTemplate=bigPicture.querySelector('.social__comment');


let visibleComments=[];
let indexVisibleComments=STEP_ADDED_COMMENTS;

const createComment = (comment, template) => {
  const newComment = template.cloneNode(true);

  const avatar = newComment.querySelector('img');
  const text = newComment.querySelector('p');

  avatar.src=comment.avatar;
  avatar.alt=comment.name;
  text.textContent=comment.message;
  return newComment;
};

const addComments = () =>{
  const addedComments=visibleComments.slice(0, indexVisibleComments);

  comments.innerHTML='';

  if (indexVisibleComments>=visibleComments.length){
    indexVisibleComments=visibleComments.length;
    commentsLoader.classList.add('hidden');
  }
  else if(visibleComments.length<=STEP_ADDED_COMMENTS){
    commentsLoader.classList.add('hidden');
  }
  else{
    commentsLoader.classList.remove('hidden');
  }


  socialCommentsCount.textContent=`${indexVisibleComments} из ${visibleComments.length} комментариев`;

  addedComments.forEach((comment) => {
    comments.appendChild(createComment(comment, commentTemplate));
  });
};

const onCommentLoarerClick = () => {
  indexVisibleComments += STEP_ADDED_COMMENTS;
  addComments();
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  visibleComments=[];
  indexVisibleComments=COMMENTS_STEP;
  commentsLoader.removeEventListener('click', onCommentLoarerClick);
};

const closingButton = bigPicture.querySelector('.big-picture__cancel');

const onClosingButtonClick =() => {
  closePhoto();
  closingButton.removeEventListener('click',onClosingButtonClick);
};

const onEscKeyDown = (evt) => {
  if (isEscape(evt))
  {
    closePhoto();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};


const openBigPhoto = (image,photo) =>{
  image.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    socialCommentsCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureImg.querySelector('img').src=photo.url;
    likesCount.textContent=photo.likes;
    socialCaption.textContent=photo.description;
    visibleComments=photo.comments;
    addComments();

    commentsLoader.addEventListener('click', onCommentLoarerClick);
    document.addEventListener('keydown', onEscKeyDown);
    closingButton.addEventListener('click', onClosingButtonClick);
  });
};

export {openBigPhoto};

