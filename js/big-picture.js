<<<<<<< Updated upstream
const bigPicture = document.querySelector('.big-picture');
const escapePressed = (ev) => ev.key === 'Escape' && closeBigPicture();
document.addEventListener('keydown',(KeyboardEvent) => escapePressed(ev));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);



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
import { AVATAR_IMAGE_SIZE, DEFAULT_RENDERED_COMMENTS, STEP_ADDED_COMMENTS } from "./constants";

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCLoseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoaderBtn = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureLike = bigPicture.querySelector('.likes-count');

let actualComments = [];
let countRenderedComments = DEFAULT_RENDERED_COMMENTS;


const getCommentTemplate = ({avatar, message, name}) => '<li class="social__comment">
<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
<p class="social__text">${message}</p>
</li>'


const getCounterCommentsTemplate = (commentsCount) => '${Math.min(countRenderedComments, commentsCount)} из <span class="comments-count">${commentsCount}</span>'

const getCounterComments = () => {
    bigPictureCommentsCounter.innerHTML = '';
    bigPictureCommentsCounter.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const renderComments = () => {
    getCounterComments();

    bigPictureCommentsList.innerHTML = '';
    const commentsTemplate = actualComments.slice(0, countRenderedComments).map((comment) => getCommentTemplate(comment)).join('');
    bigPictureCommentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

    if (countRenderedComments >= actualComments.length) {
        bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
        bigPictureCommentsLoaderBtn.classList.add('hidden');
    }
}

const initComments = ({comments}) => {
    actualComments = comments.slice();
    bigPictureCommentsList.innerHTML = '';

    if (comments.length === 0) {
        bigPictureCommentsLoaderBtn.classList.add('hidden');
        bigPictureCommentsCounter.textContent = 'Нет комментариев';
        return;
    } 

    renderComments();
    bigPictureCommentsLoaderBtn.addEventListener('click', onBigPictureCommentsLoaderBtnClick);
};

const closeBigPicture = () => {
    document.body.classList.contains('modal-open');
    bigPicture.classList.add('hidden');
    bigPictureCLoseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
    window.removeEventListener('keydown', onWindowEscKeydown);
    bigPictureCommentsLoaderBtn.classList.remove('hidden');
    bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
    countRenderedComments = DEFAULT_RENDERED_COMMENTS;
};

function onBigPictureCloseBtnClick() {
    closeBigPicture();
};

function onWindowEscKeydown(evt) {
    if (evt.key === 'Escape') {
        closeBigPicture();
        document.removeEventListener('keydown', onWindowEscKeydown);
    }
}

function onBigPictureCommentsLoaderBtnClick() {
    countRenderedComments += STEP_ADDED_COMMENTS;
    renderComments();
}

const showBigPicture = (photo) => {
   document.body.classList.add('modal-open');
   bigPicture.classList.remove('hidden');
   bigPictureImg.setAttribute('src', photo.url);
   bigPictureCaption.textContent = photo.description;
   bigPictureLike.textContent = photo.likes;

   initComments(photo);

   bigPictureCLoseBtn.addEventListener('click', onBigPictureCloseBtnClick);
   window.addEventListener('keydown', onWindowEscKeydown);
};

export { showBigPicture };

>>>>>>> Stashed changes
