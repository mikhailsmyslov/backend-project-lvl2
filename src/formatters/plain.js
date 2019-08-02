import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return "'[complex value]'";
  return _.isString(value)
    ? `'${value}'`
    : value;
};

const actions = {
  added: ({ value }) => `added with value: ${stringify(value)}`,
  deleted: () => 'deleted',
  changed: ({ oldValue, newValue }) => `changed from ${stringify(oldValue)} to ${stringify(newValue)}`,
};

const render = (ast, path = '') => {
  const mapped = ast.map((item) => {
    const { key, state, children } = item;
    if (state === 'node') return render(children, `${path}${key}.`);

    return state === 'same'
      ? []
      : `Property '${path}${key}' was ${actions[state](item)}`;
  });

  return _.flattenDeep(mapped).join('\n');
};

export default render;
