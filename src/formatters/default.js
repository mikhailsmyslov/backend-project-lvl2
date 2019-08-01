import _ from 'lodash';

const prefixes = {
  added: ['+'], deleted: ['-'], same: [' '], changed: ['-', '+'], node: [' '],
};

const mkIndent = spacesCount => ' '.repeat(spacesCount);

const stringify = (value, spacesCount) => {
  if (!_.isObject(value)) return value;
  const text = Object.entries(value)
    .map(([k, v]) => `${mkIndent(spacesCount + 4)}${k}: ${v}`).join('\n');
  return `{\n${text}\n${mkIndent(spacesCount)}}`;
};

const render = (ast, spacesCount = 0) => {
  const mapped = ast.map(({
    key, state, value, oldValue, newValue, children,
  }) => {
    const prefix = prefixes[state];

    const values = state === 'node'
      ? [render(children, spacesCount + 4)]
      : _.without([value, oldValue, newValue], undefined);

    return prefix.map((p, i) => `${mkIndent(spacesCount + 2)}${p} ${key}: ${stringify(values[i], spacesCount + 4)}`);
  });

  const text = _.flattenDeep(mapped).join('\n');
  return `{\n${text}\n${mkIndent(spacesCount)}}`;
};

export default render;
