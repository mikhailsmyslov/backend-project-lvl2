import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getFormatter from './formatters';

const propertyActions = [
  {
    state: 'added',
    check: b => b === undefined,
    process: (b, a) => [a],
  },
  {
    state: 'deleted',
    check: (b, a) => a === undefined,
    process: b => [b],
  },
  {
    state: 'node',
    check: (b, a) => (b instanceof Object) && (a instanceof Object),
    process: () => [],
  },
  {
    state: 'same',
    check: (b, a) => b === a,
    process: b => [b],
  },
  {
    state: 'changed',
    check: (b, a) => b !== a,
    process: (b, a) => [b, a],
  },
];

const getpropertyActions = (b, a) => propertyActions.find(({ check }) => check(b, a));

const buildAst = (before, after) => Object.keys({ ...before, ...after }).map((key) => {
  const beforeValue = before[key];
  const afterValue = after[key];
  const { state, process } = getpropertyActions(beforeValue, afterValue);
  const children = state === 'node'
    ? buildAst(beforeValue, afterValue)
    : [];
  const value = process(beforeValue, afterValue);
  return {
    key, state, value, children,
  };
});

const getParsedContent = (pathToFile) => {
  const format = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'UTF-8');
  return parse(format, content);
};

export default (pathToFile1, pathToFile2, formatter = 'default') => {
  const before = getParsedContent(pathToFile1);
  const after = getParsedContent(pathToFile2);
  const render = getFormatter(formatter);
  const ast = buildAst(before, after);
  return render(ast);
};
