import defaultFormatter from './default';

const formatters = {
  default: defaultFormatter,
};

export default formatter => formatters[formatter];
