import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getFormatter from './formatters';

const processValues = (oldValue, newValue) => ({ oldValue, newValue });

const propertyActions = [
  {
    type: 'added',
    check: b => b === undefined,
    process: processValues,
  },
  {
    type: 'deleted',
    check: (b, a) => a === undefined,
    process: processValues,
  },
  {
    type: 'nested',
    check: (b, a) => (b instanceof Object) && (a instanceof Object),
    process: (b, a, fn) => ({ children: fn(b, a) }),
  },
  {
    type: 'same',
    check: (b, a) => b === a,
    process: processValues,
  },
  {
    type: 'changed',
    check: (b, a) => b !== a,
    process: processValues,
  },
];

const getpropertyActions = (b, a) => propertyActions.find(({ check }) => check(b, a));

const buildAst = (oldConfig, newConfig) => Object.keys({ ...oldConfig, ...newConfig })
  .map((property) => {
    const oldValue = oldConfig[property];
    const newValue = newConfig[property];
    const { type, process } = getpropertyActions(oldValue, newValue);
    return {
      property, type, children: [], ...process(oldValue, newValue, buildAst),
    };
  });

const getParsedContent = (pathToFile) => {
  const format = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'UTF-8');
  return parse(format, content);
};

export default (pathToFile1, pathToFile2, formatter = 'default') => {
  const oldConfig = getParsedContent(pathToFile1);
  const newCongif = getParsedContent(pathToFile2);
  const render = getFormatter(formatter);
  const ast = buildAst(oldConfig, newCongif);
  return render(ast);
};
