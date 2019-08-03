import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return "'[complex value]'";
  return _.isString(value) ? `'${value}'` : value;
};

const propertyActions = {
  added: ({ newValue }) => `added with value: ${stringify(newValue)}`,
  deleted: () => 'deleted',
  changed: ({ oldValue, newValue }) => `changed from ${stringify(oldValue)} to ${stringify(newValue)}`,
};

const render = (ast, path = '') => {
  const filtered = ast.filter(item => item.type !== 'same');
  const mapped = filtered.map((item) => {
    const { property, type, children } = item;
    return type === 'nested'
      ? render(children, `${path}${property}.`)
      : `Property '${path}${property}' was ${propertyActions[type](item)}`;
  });
  return _.flattenDeep(mapped).join('\n');
};

export default render;
