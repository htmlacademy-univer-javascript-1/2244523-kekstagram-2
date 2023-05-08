
export const DEFAULT_RENDERED_COMMENTS = 5;
export const STEP_ADDED_COMMENTS = 5;
export const MAX_COMMENT_LENGTH = 140;
export const MAX_COUNT_RANDOM_PHOTO = 10;
export const AVATAR_IMAGE_SIZE = 35;
export const RERENDER_DELAY = 500;

export const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export const MaxHashtag = {
    LENGTH: 20,
    COUNT: 5
};

export const Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25
}

export const PhotoValide = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export const Filter = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
}

export const Effects = {
    'original': {
        name: 'original', filter: '', unit: '',
        options: { range: { min: 0, max: 100 }, step: 1, start: 100 },
    },
    'heat': {
        name: 'heat', filter: 'brightness', unit: '',
        options: { range: {min: 1, max: 3}, step: 0.1, start: 3 },
    },
    'chrome': {
        name: 'chrome', filter: 'grayscale', unit: '',
        options: {range: {min: 0, max: 1}, step: 0.1, start: 1 },
    },
    'sepia': {
        name: 'sepia', filter: 'sepia', unit: '',
        options: {range: {min: 0, max: 1}, step: 0.1, start: 1 },
    },
    'marvin': {
        name: 'marvin', filter: 'invert', unit: '%',
        options: {range: {min: 0, max: 100}, step: 1, start: 100 },
    },
    'phobos': {
        name: 'phobos', filter: 'blur', unit: 'px',
        options: {range: {min: 0, max: 3}, step: 0.1, start: 3 },
    },
};

export const ErrorMessage = {
    HASH_SPACE: 'Хэш-теги разделяются пробелами',
    STARTS_WITH_HASH: 'Хэш-тег начинается с символа #',
    REPEAT_ERROR: 'Хэш-теги не должны повторяться',
    HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ${MaxHashtag.LENGTH} символов, включая #',
    HASHTAG_MAX_COUNT: 'Нельзя указать больше ${MaxHashtag.COUNT} хэш-тегов',
    UBNORMAL_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
    MAX_COMM_LENGTH: 'Максимальная длина комментария - ${MAX_COMMENT_LENGTH} символов',
    EMPTY_HASHTAG: 'Хэштег не может быть пустым',
};



