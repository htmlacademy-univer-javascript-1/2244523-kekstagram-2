import {createMiniatures} from './photo-miniature.js';
import './big-photo.js';
import './user-form.js';
import './photo-filter.js';
import {getData} from './api.js';
import './scale.js';
import {sort} from './filters.js';


getData((photos) => { createMiniatures(photos);
  sort(photos);
});

