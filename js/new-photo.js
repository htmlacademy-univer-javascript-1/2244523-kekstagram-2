const uploadPhotoInput = document.querySelector('#upload-file');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('#upload-cancel');

const onUploadPhotoInputChange = (evt) => {
    if (evt.target.value)  {
        openUploadOverlay();
    }
};

const onUploadPhotoEscKeydown = (evt) => {
    if escape 
}