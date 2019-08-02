import defaultFormatter from './default';
import plain from './plain';
import json from './json';

const formatters = {
  default: defaultFormatter,
  plain,
  json,
};

export default formatter => formatters[formatter];
