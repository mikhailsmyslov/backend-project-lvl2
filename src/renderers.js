const stringify = (value, spaceCount) => {
  if (value instanceof Object) {
    const spacing = ' '.repeat(spaceCount + 2);
    const text = Object.entries(value).map(([key, val]) => `${spacing}${key}: ${val}`).join('\n');
    return `{\n${text}\n${' '.repeat(spaceCount - 2)}}`;
  }
  return value;
};

const recordActions = [
  {
    check: 'added',
    process: ({ key, value }, spaceCount) => [`+ ${key}: ${stringify(value, spaceCount)}`],
  },
  {
    check: 'deleted',
    process: ({ key, value }, spaceCount) => [`- ${key}: ${stringify(value, spaceCount)}`],
  },
  {
    check: 'changed',
    process: ({ key, value }, spaceCount) => [
      `- ${key}: ${stringify(value.old, spaceCount)}`,
      `+ ${key}: ${stringify(value.new, spaceCount)}`,
    ],
  },
  {
    check: 'same',
    process: ({ key, value }, spaceCount) => [`  ${key}: ${stringify(value, spaceCount)}`],
  },
  {
    check: 'node',
    process: ({ key, children }, spaceCount, render) => [`  ${key}: ${render(children, spaceCount)}`],
  },
];

const getRecordAction = record => recordActions.find(({ check }) => check === record.state);

const render = (ast, spaceCount = 2) => {
  const spacing = ' '.repeat(spaceCount);
  const text = ast.reduce((acc, item) => {
    const { process } = getRecordAction(item);
    return acc.concat(
      process(item, spaceCount + 4, render).map(el => `${spacing}${el}`),
    );
  }, []).join('\n');
  return `{\n${text}\n${' '.repeat(spaceCount - 2)}}`;
};

export default render;
