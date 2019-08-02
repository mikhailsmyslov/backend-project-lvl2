import defaultFormatter from './default';
import plain from './plain';

const formatters = {
  default: defaultFormatter,
  plain,
};

export default formatter => formatters[formatter];
