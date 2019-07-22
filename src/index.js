import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const states = [
  // b - "before"
  // a - "after"
  {
    state: ['+'],
    check: b => b === undefined,
  },
  {
    state: ['-'],
    check: (b, a) => a === undefined,
  },
  {
    state: [' '],
    check: (b, a) => b === a,
  },
  {
    state: ['-', '+'],
    check: (b, a) => b !== a,
  },
];

const getKeyState = (b, a) => states.find(({ check }) => check(b, a));

const generateAst = (before, after) => Object.keys({ ...before, ...after })
  .reduce((acc, key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    const { state } = getKeyState(beforeValue, afterValue);
    const values = _.uniq(_.without([beforeValue, afterValue], undefined));
    const record = {
      key,
      state,
      values,
    };
    return [...acc, record];
  },
  []);

const render = (ast) => {
  const text = ast.reduce((acc, item) => {
    const {
      key,
      state,
      values,
    } = item;
    return acc.concat(values.map((val, ind) => `  ${state[ind]} ${key}: ${val}`));
  }, []).join('\n');
  return `{\n${text}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const beforeExt = path.extname(pathToFile1);
  const afterExt = path.extname(pathToFile2);
  const beforeData = fs.readFileSync(pathToFile1, 'UTF-8');
  const afterData = fs.readFileSync(pathToFile2, 'UTF-8');
  const before = parse(beforeExt, beforeData);
  const after = parse(afterExt, afterData);
  const ast = generateAst(before, after);
  return render(ast);
};
