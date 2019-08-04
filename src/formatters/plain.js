import _ from 'lodash';

const format = (value) => {
  if (_.isObject(value)) return "'[complex value]'";
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const propertyActions = [
  {
    type: 'added',
    process: ({ property, newValue }, path) => `Property '${path}${property}' was added with value: ${format(newValue)}`,
  },
  {
    type: 'deleted',
    process: ({ property }, path) => `Property '${path}${property}' was deleted`,
  },
  {
    type: 'changed',
    process: (
      { property, oldValue, newValue }, path,
    ) => `Property '${path}${property}' was changed from ${format(oldValue)} to ${format(newValue)}`,
  },
  {
    type: 'nested',
    process: ({ property, children }, path, fn) => fn(children, `${path}${property}.`),
  },
  {
    type: 'same',
    process: () => [],
  },
];

const getPropertyActions = item => propertyActions.find(({ type }) => item.type === type);

const render = (ast, path = '') => _.flattenDeep(
  ast.map((item) => {
    const { process } = getPropertyActions(item);
    return process(item, path, render);
  }),
).join('\n');

export default render;
