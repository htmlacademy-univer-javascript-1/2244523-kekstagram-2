<<<<<<< Updated upstream
const bigPicture = document.querySelector('.big-picture');
document.addEventListener('keydown',(KeyboardEvent) => escapePressed(ev));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);

const escapePressed = (ev) => ev.key === 'Escape' && closeBigPicture();

const AVATAR_IMAGE_SIZE = 35;

function createAvatar (avatar, name) {
    const avatarImg = document.createElement('img');
    listItem.classList.add('social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;

    avatarImg.width = AVATAR_IMAGE_SIZE;
    avatarImg.height = AVATAR_IMAGE_SIZE;

    return avatarImg;
}

function createCommentText (message) {
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;

    return commentText;
}

function createComments({avatar, name, message}) {
    const listItem = document.createElement('li');

    listItem.classList.add('social__comment');
    

    listItem.appendChild(createAvatar(avatar, name));
    listItem.appendChild(createCommentText(message));

    return listItem;
}

function createBigPicture({url, likes, description, comments}) {
    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;

    const commentsFragment = document.createDocumentFragment();

    for (const comment of comments) {
       commentsFragment.appendChild(createComments(comment));
    }

    bigPicture.querySelector('social__comments').replaceChildren(commentsFragment);
    bigPicture.querySelector('social__caption').textContent = description;
}

export function showBigPicture(picture) {
    if (document.body.classList.contains('modal-open')) {
        return;
    }

    createBigPicture(picture) 
        bigPicture.querySelector('social__comments-count').classList.add('hidden');
        bigPicture.querySelector('.comments-loader').classList.add('hidden');

        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
}

function closeBigPicture() {
    if (document.body.classList.contains('modal-open') === false) {
        return;
    }

    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
}
=======

import { showComments } from './comments.js';
import { isEscape } from './util.js';
import { picturesWrap } from './pictures.js';

const bigPicture = document.querySelector('.big-picture');

const commentsWrap = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsWrap.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const fullSizePictureRender = (evt, userPhotos) => {
  commentsWrap.innerHTML = '';

  const pictureSrc = evt.target.src;
  bigPicture.querySelector('.big-picture__img img').src = pictureSrc;

  const userPhotoCurrent = userPhotos.find((userPhoto) => pictureSrc.indexOf(userPhoto.url) !== -1);

  const userPhotoCurrentComments = userPhotoCurrent.comments;

  bigPicture.querySelector('.likes-count').textContent = userPhotoCurrent.likes;
  bigPicture.querySelector('.comments-count').textContent = userPhotoCurrentComments.length;
  bigPicture.querySelector('.social__caption').textContent = userPhotoCurrent.description;

  userPhotoCurrentComments.forEach((item) => {
    commentsWrap.innerHTML = '';
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    commentsFragment.appendChild(newComment);
  });
  commentsWrap.appendChild(commentsFragment);

  showComments();
};

const commentsWrapClear = () => {
  commentsWrap.innerHTML = '';
};

const getBigPopup = (userPhotos) => {
    const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
  
    const onBigPictureEscKeydown = (evt) => {
      if (isEscape(evt)) {
        evt.preventDefault();
        closeBigPicture();
      }
    };
  
    function openBigPicture(evtEl, photos) {
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
      fullSizePictureRender(evtEl, photos);
      document.addEventListener('keydown', onBigPictureEscKeydown);
    }
  
    function closeBigPicture() {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentsWrapClear();
      document.removeEventListener('keydown', onBigPictureEscKeydown);
    }
  
    picturesWrap.addEventListener('click', (evt) => {
      if (evt.target.matches('.picture__img')) {
        openBigPicture(evt, userPhotos);
      }
    });
  
    bigPictureCloseElement.addEventListener('click', () => {
      closeBigPicture();
    });
  };
  

export { fullSizePictureRender, bigPicture, commentsWrapClear, commentsWrap, getBigPopup };
>>>>>>> Stashed changes
