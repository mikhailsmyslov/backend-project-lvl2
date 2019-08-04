import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import getFormatter from './formatters';

const processValues = (oldValue, newValue) => ({ oldValue, newValue });

const propertyActions = [
  {
    type: 'added',
    check: oldValue => _.isUndefined(oldValue),
    process: processValues,
  },
  {
    type: 'deleted',
    check: (oldValue, newValue) => _.isUndefined(newValue),
    process: processValues,
  },
  {
    type: 'nested',
    check: (oldValue, newValue) => _.isObject(oldValue) && _.isObject(newValue),
    process: (oldValue, newValue, fn) => ({ children: fn(oldValue, newValue) }),
  },
  {
    type: 'same',
    check: (oldValue, newValue) => _.isEqual(oldValue, newValue),
    process: processValues,
  },
  {
    type: 'changed',
    check: (oldValue, newValue) => !_.isEqual(oldValue, newValue),
    process: processValues,
  },
];

const getPropertyActions = (oldValue, newValue) => propertyActions
  .find(({ check }) => check(oldValue, newValue));

const buildAst = (oldConfig, newConfig) => Object.keys({ ...oldConfig, ...newConfig })
  .map((property) => {
    const oldValue = oldConfig[property];
    const newValue = newConfig[property];
    const { type, process } = getPropertyActions(oldValue, newValue);
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
