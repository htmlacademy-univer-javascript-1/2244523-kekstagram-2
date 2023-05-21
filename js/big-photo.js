const SHOW_FIVE_COMMENTS = 5;
const activeImg = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialCommentsCount = document.querySelector('.social__comment-count');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCaption = document.querySelector('.social__caption');

const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentTemplateAll = document.querySelector('#comment').content;
const commentTemplate = commentTemplateAll.querySelector('li');
const bigPictureCancel = document.querySelector('#picture-cancel');
const loaderButton = document.querySelector('.comments-loader');
const commentsLoader = document.querySelector('.comments-loader');

const createCommentPhotoUser = (commentsInfo) => {
  const commentFragment = document.createDocumentFragment();
  commentsInfo.forEach(({ avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src=avatar;
    comment.querySelector('img').alt=name;
    comment.querySelector('p').textContent=message;
    commentFragment.append(comment);
  });
  return commentFragment;
};

const openBigPicture = () => {
  activeImg.classList.remove('hidden');
  body.classList.add('modal-open');
};

function close(){
  activeImg.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsList.innerHTML = '';
  bigPictureCancel.removeEventListener('click', close);
}
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    close();
  }
});
let arrayComments = [];


const createBigPhoto = (miniatures, description, likes, comments) => {
  bigPictureImg.querySelector('img').src = miniatures.querySelector('.picture__img').src;
  socialCaption.textContent = description;
  likesCount.textContent=likes;
  commentsCount.textContent = miniatures.querySelector('.picture__comments').textContent;
  arrayComments=comments;
  showFirstComments(comments);
  loaderButton.addEventListener('click', loadingCommentsClick);
  openBigPicture();
  bigPictureCancel.addEventListener('click',close);
};

function showFirstComments(comments) {
  const firstComments = comments.slice(0, SHOW_FIVE_COMMENTS);
  const createFirstComments = createCommentPhotoUser(firstComments);
  socialCommentsCount.firstChild.textContent = `${firstComments.length} из  `;
  commentsList.appendChild(createFirstComments);
  if (firstComments.length === comments.length) {
    loaderButton.classList.add('hidden');
  }
}
function loadingCommentsClick() {
  const afterComments = arrayComments.slice(
    commentsList.children.length,
    commentsList.children.length + SHOW_FIVE_COMMENTS,
  );
  const createAfterComments = createCommentPhotoUser(afterComments);
  commentsList.appendChild(createAfterComments);
  if (arrayComments.length === commentsList.children.length) {
    loaderButton.classList.add('hidden');
  }
  socialCommentsCount.firstChild.textContent = `${commentsList.children.length} из  `;
}
export {createBigPhoto};
