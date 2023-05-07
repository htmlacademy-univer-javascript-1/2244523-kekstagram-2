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