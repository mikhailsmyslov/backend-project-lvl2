import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import getFormatter from './formatters';

const getPropertiesList = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));
const processValues = (oldValue, newValue) => ({ oldValue, newValue });

const propertyActions = [
  {
    type: 'added',
    check: (oldConfig, newConfig, property) => !_.has(oldConfig, property)
      && _.has(newConfig, property),
    process: processValues,
  },
  {
    type: 'deleted',
    check: (oldConfig, newConfig, property) => _.has(oldConfig, property)
      && !_.has(newConfig, property),
    process: processValues,
  },
  {
    type: 'nested',
    check: (oldConfig, newConfig, property) => _.isObject(oldConfig[property])
      && _.isObject(newConfig[property]),
    process: (oldValue, newValue, fn) => ({ children: fn(oldValue, newValue) }),
  },
  {
    type: 'same',
    check: (oldConfig, newConfig, property) => _.isEqual(oldConfig[property], newConfig[property]),
    process: processValues,
  },
  {
    type: 'changed',
    check: (oldConfig, newConfig, property) => !_.isEqual(oldConfig[property], newConfig[property]),
    process: processValues,
  },
];

const getPropertyActions = (oldConfig, newConfig, property) => propertyActions
  .find(({ check }) => check(oldConfig, newConfig, property));

const buildAst = (oldConfig, newConfig) => {
  const properties = getPropertiesList(oldConfig, newConfig);
  return properties.map((property) => {
    const { type, process } = getPropertyActions(oldConfig, newConfig, property);
    const oldValue = oldConfig[property];
    const newValue = newConfig[property];
    return {
      property, type, children: [], ...process(oldValue, newValue, buildAst),
    };
  });
};

const getParsedContent = (pathToFile) => {
  const format = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'UTF-8');
  return parse(format, content);
};

export default (pathToFile1, pathToFile2, formatter = 'tree') => {
  const oldConfig = getParsedContent(pathToFile1);
  const newCongif = getParsedContent(pathToFile2);
  const render = getFormatter(formatter);
  const ast = buildAst(oldConfig, newCongif);
  return render(ast);
};
