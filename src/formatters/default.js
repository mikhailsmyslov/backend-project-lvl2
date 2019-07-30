import { flattenDeep, isObject } from 'lodash';

const prefixes = {
  added: ['+ '],
  deleted: ['- '],
  same: ['  '],
  changed: ['- ', '+ '],
  node: ['  '],
};

const makeSpacing = depth => ' '.repeat(depth);

const toString = (value, spaceCount) => {
  if (isObject(value)) {
    const text = Object.entries(value)
      .map(([key, val]) => `${makeSpacing(spaceCount + 4)}${key}: ${val}`)
      .join('\n');
    return `{\n${text}\n${makeSpacing(spaceCount)}}`;
  }
  return value;
};

const render = (ast, spaceCount = 0) => {
  const mapped = ast.map(({
    key, value, state, children,
  }) => {
    const content = state === 'node'
      ? [render(children, spaceCount + 4)]
      : value;
    return prefixes[state].map((sign, ind) => `${makeSpacing(spaceCount + 2)}${sign}${key}: ${toString(content[ind], spaceCount + 4)}`);
  });
  const text = flattenDeep(mapped).join('\n');
  return `{\n${text}\n${makeSpacing(spaceCount)}}`;
};

export default render;
