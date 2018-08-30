import FloatLabels from 'float-labels.js';

import ValidateForm from './validate';
import { prototype } from './prototype';

export const init = (form, options) => {
  const _options = Object.assign({}, prototype.defaults, options || {});
  new FloatLabels(form, _options.floatLabels);
  new ValidateForm(form, _options.validate);
};

export { prototype };
