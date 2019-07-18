import fs from 'fs';
import * as _ from 'lodash';

const getFileContent = pathToFile => JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));

const gendiff = (pathToFile1, pathToFile2) => {
  const before = getFileContent(pathToFile1);
  const after = getFileContent(pathToFile2);

  const keys = _.union(Object.keys(before), Object.keys(after));

  const ast = keys.reduce((acc, key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    return { ...acc, [key]: [beforeValue, afterValue] };
  }, {});

  const reducer = (val, key) => {
    const [bef, aft] = val;
    switch (true) {
      case bef === aft:
        return [`  ${key}: ${bef}`];
      case bef === undefined:
        return [`+ ${key}: ${aft}`];
      case aft === undefined:
        return [`- ${key}: ${bef}`];
      default:
        return [`- ${key}: ${bef}`, `+ ${key}: ${aft}`];
    }
  };

  const diff = _.reduce(ast, (acc, val, key) => [...acc, ...reducer(val, key)], []);

  return `{\n  ${diff.join('\n  ')}\n}`;
};

export default gendiff;
