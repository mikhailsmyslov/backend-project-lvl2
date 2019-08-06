import tree from './tree';
import plain from './plain';
import json from './json';

const formatters = {
  tree,
  plain,
  json,
};

export default formatter => formatters[formatter];
