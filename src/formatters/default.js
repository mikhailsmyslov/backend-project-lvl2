import _ from 'lodash';

const tab = '    ';
const doubleSpace = '  ';

const format = (value, indent) => {
  if (_.isObject(value)) {
    const newIndent = indent.concat(doubleSpace);
    const text = Object.entries(value).map(([key, val]) => `${newIndent}${tab}${key}: ${val}`).join('\n');
    return `{\n${text}\n${newIndent}}`;
  }
  return value;
};

const stringify = (indent, prefix, property, value) => `${indent}${prefix} ${property}: ${format(value, indent)}`;

const propertyActions = [
  {
    type: 'added',
    process: ({ property, newValue }, indent) => stringify(indent, '+', property, newValue),
  },
  {
    type: 'deleted',
    process: ({ property, oldValue }, indent) => stringify(indent, '-', property, oldValue),
  },
  {
    type: 'changed',
    process: ({ property, oldValue, newValue }, indent) => [
      stringify(indent, '-', property, oldValue),
      stringify(indent, '+', property, newValue),
    ],
  },
  {
    type: 'same',
    process: ({ property, oldValue }, indent) => stringify(indent, ' ', property, oldValue),
  },
  {
    type: 'nested',
    process: ({ property, children }, indent, fn) => stringify(indent, ' ', property, fn(children, indent.concat(doubleSpace))),
  },
];

const getPropertyAction = item => propertyActions.find(({ type }) => item.type === type);

const render = (ast, currentIndent = '') => {
  const nextIndent = currentIndent.concat(doubleSpace);
  const mapped = ast.map((item) => {
    const { process } = getPropertyAction(item);
    return process(item, nextIndent, render);
  });
  const text = _.flattenDeep(mapped).join('\n');
  return `{\n${text}\n${currentIndent}}`;
};

export default render;
