


const pictureTemplate = document.querySelector('#picture');
const pictureContainer = document.querySelector('.pictures');

export function insertPhotoMiniature (photoDescriptions) {
    const pictureFragment = document.createDocumentFragment();
    for (const {url, likes,comments} of photoDescriptions) {
        const picture = pictureTemplate.cloneNode(true).content;
        picture.querySelector('picture__img').src = url;
        picture.querySelector('picture__likes').src = likes;
        picture.querySelector('picture__comments').src = comments;
        pictureFragment.appendChild(picture);
    }

    pictureContainer.appendChild(pictureFragment);
}
