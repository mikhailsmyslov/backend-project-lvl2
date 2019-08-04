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

const propertyActions = [
  {
    type: 'added',
    process: ({ property, newValue }, indent) => `${indent}+ ${property}: ${format(newValue, indent)}`,
  },
  {
    type: 'deleted',
    process: ({ property, oldValue }, indent) => `${indent}- ${property}: ${format(oldValue, indent)}`,
  },
  {
    type: 'changed',
    process: ({ property, oldValue, newValue }, indent) => [
      `${indent}- ${property}: ${format(oldValue, indent)}`,
      `${indent}+ ${property}: ${format(newValue, indent)}`,
    ],
  },
  {
    type: 'same',
    process: ({ property, oldValue }, indent) => `${indent}  ${property}: ${format(oldValue, indent)}`,
  },
  {
    type: 'nested',
    process: ({ property, children }, indent, fn) => `${indent}  ${property}: ${fn(children, indent.concat(doubleSpace))}`,
  },
];

const getPropertyAction = item => propertyActions.find(({ type }) => item.type === type);

const render = (ast, currentIndent = '') => {
  const nextIndent = currentIndent.concat(doubleSpace);
  const text = _.flattenDeep(
    ast.map((item) => {
      const { process } = getPropertyAction(item);
      return process(item, nextIndent, render);
    }),
  ).join('\n');
  return `{\n${text}\n${currentIndent}}`;
};

export default render;
