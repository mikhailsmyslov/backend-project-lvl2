import _ from 'lodash';

const prefixesList = {
  added: ['+'], deleted: ['-'], same: [' '], changed: ['-', '+'], nested: [' '],
};

const makeIndent = spacesCount => ' '.repeat(spacesCount);

const stringify = (value, spacesCount) => {
  if (!_.isObject(value)) return value;
  const text = Object.entries(value)
    .map(([key, val]) => `${makeIndent(spacesCount + 4)}${key}: ${val}`).join('\n');
  return `{\n${text}\n${makeIndent(spacesCount)}}`;
};

const render = (ast, spacesCount = 0) => {
  const mapped = ast.map(({
    property, type, oldValue, newValue, children,
  }) => {
    const prefixes = prefixesList[type];

    const values = type === 'nested'
      ? [render(children, spacesCount + 4)]
      : _.without([oldValue, newValue], undefined);

    return prefixes
      .map((prefix, index) => `${makeIndent(spacesCount + 2)}${prefix} ${property}: ${stringify(values[index], spacesCount + 4)}`);
  });

  const text = _.flattenDeep(mapped).join('\n');
  return `{\n${text}\n${makeIndent(spacesCount)}}`;
};

export default render;
