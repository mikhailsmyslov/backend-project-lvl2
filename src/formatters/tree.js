import _ from 'lodash';

const tab = '    ';
const doubleSpace = '  ';

const format = (value, indent) => {
  if (!_.isObject(value)) return value;
  const newIndent = indent.concat(doubleSpace);
  const text = Object.entries(value).map(([key, val]) => `${newIndent}${tab}${key}: ${val}`).join('\n');
  return `{\n${text}\n${newIndent}}`;
};

const stringify = (indent, prefix, property, value) => `${indent}${prefix} ${property}: ${format(value, indent)}`;

const propertyActions = {
  added: ({ property, newValue }, indent) => stringify(indent, '+', property, newValue),
  deleted: ({ property, oldValue }, indent) => stringify(indent, '-', property, oldValue),
  changed: ({ property, oldValue, newValue }, indent) => [
    stringify(indent, '-', property, oldValue),
    stringify(indent, '+', property, newValue),
  ],
  same: ({ property, oldValue }, indent) => stringify(indent, ' ', property, oldValue),
  nested: ({ property, children }, indent, fn) => stringify(indent, ' ', property, fn(children, indent.concat(doubleSpace))),
};

const render = (ast, currentIndent = '') => {
  const nextIndent = currentIndent.concat(doubleSpace);
  const mapped = ast.map((item) => {
    const process = propertyActions[item.type];
    return process(item, nextIndent, render);
  });
  const text = _.flattenDeep(mapped).join('\n');
  return `{\n${text}\n${currentIndent}}`;
};

export default render;
