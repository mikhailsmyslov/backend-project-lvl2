import _ from 'lodash';

const format = (value) => {
  if (_.isObject(value)) return "'[complex value]'";
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const propertyActions = {
  added: ({ property, newValue }, path) => `Property '${path}${property}' was added with value: ${format(newValue)}`,
  deleted: ({ property }, path) => `Property '${path}${property}' was deleted`,
  changed: (
    { property, oldValue, newValue }, path,
  ) => `Property '${path}${property}' was changed from ${format(oldValue)} to ${format(newValue)}`,
  nested: ({ property, children }, path, fn) => fn(children, `${path}${property}.`),
  same: () => [],
};

const render = (ast, path = '') => {
  const mapped = ast.map((item) => {
    const process = propertyActions[item.type];
    return process(item, path, render);
  });
  return _.flattenDeep(mapped).join('\n');
};

export default render;
