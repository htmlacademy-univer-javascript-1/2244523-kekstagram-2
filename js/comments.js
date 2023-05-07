import { commentsWrap } from './big-picture.js';
import { DEFAULT_RENDERED_COMMENTS, STEP_ADDED_COMMENTS } from './constants.js';

const commentsLoaderBtn = document.querySelector('.comments-loader');
const commentUploadCount = document.querySelector('.comments-upload-count');

const showComments = () => {
  const comments = Array.from(commentsWrap.children);
  const commentsNumber = comments.length;
  const uploadedComments = [];

  comments.forEach((comment) => {
    comment.classList.add('hidden');
  });

  if (commentsNumber >  DEFAULT_RENDERED_COMMENTS) {
    for (let i = 0; i <  DEFAULT_RENDERED_COMMENTS; i++) {
      comments[i].classList.remove('hidden');
      uploadedComments.push(comments[i]);
    }
    commentUploadCount.textContent = uploadedComments.length;
    commentsLoaderBtn.classList.remove('hidden');
    commentsLoaderBtn.addEventListener('click', onCommentsLoaderBtnClick);
  } else {
    comments.forEach((comment) => {
      comment.classList.remove('hidden');
    });
    commentsLoaderBtn.classList.add('hidden');
    commentUploadCount.textContent = comments.length;
  }

  function onCommentsLoaderBtnClick() {
    const uploadedCommentsLength = uploadedComments.length;
    for (let i = uploadedCommentsLength; i < (uploadedCommentsLength + STEP_ADDED_COMMENTS); i++) {
      if (comments[i]) {
        comments[i].classList.remove('hidden');
        uploadedComments.push(comments[i]);
        commentUploadCount.textContent = uploadedComments.length;
      }
    }

    if (uploadedComments.length === commentsNumber) {
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
    }
  }
};
export { showComments };