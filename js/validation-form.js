const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENTS_LENGTH = 140;

const inputHashtags = document.querySelector('.text__hashtags');
const inputComments = document.querySelector('.text__description');

inputHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
inputComments.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
function commentLength() {
  const injectedСomments = inputComments.value;
  if (injectedСomments.length > MAX_COMMENTS_LENGTH) {
    return false;
  }
  return true;
}

function isEveryHashtagSymbolsValid(elem) {
  const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
  return re.test(elem);
}
function isHashtagSymbolsValid() {
  const hashtags = inputHashtags.value.toLowerCase().trim().split(' ');
  if (hashtags.every(isEveryHashtagSymbolsValid)) { return true; }
  else { return false; }
}


function isAmountValid() {
  const hashtags = inputHashtags.value.toLowerCase().split(' ');
  if (hashtags.length <= MAX_HASHTAG_NUMBERS) { return true; }
  else { return false; }
}

function areHashtagsUnique() {
  const hashtags = inputHashtags.value.toLowerCase().trim().split(' ');
  const uniqueHashTagArray = new Set(hashtags);
  if (hashtags.length !== uniqueHashTagArray.size) {
    return false;
  }
  else { return true; }
}

function hashtagsValid(value) {
  const hashtags = value.toLowerCase().trim().split(' ');
  const injectedСomments = inputHashtags.value.toLowerCase().trim().split(' ');
  if (isAmountValid(hashtags) && areHashtagsUnique(hashtags) && isHashtagSymbolsValid(hashtags) && commentLength(injectedСomments)) {
    return true;
  }
  else { return false; }
}
export {inputHashtags, hashtagsValid, inputComments, isEveryHashtagSymbolsValid, isAmountValid, areHashtagsUnique, commentLength};
