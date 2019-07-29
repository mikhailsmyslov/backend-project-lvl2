import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const settingActions = [
  {
    state: 'added',
    check: b => b === undefined,
    process: (b, a) => a,
  },
  {
    state: 'deleted',
    check: (b, a) => a === undefined,
    process: b => b,
  },
  {
    state: 'node',
    check: (b, a) => (b instanceof Object) && (a instanceof Object),
    process: () => '',
  },
  {
    state: 'same',
    check: (b, a) => b === a,
    process: b => b,
  },
  {
    state: 'changed',
    check: (b, a) => b !== a,
    process: (b, a) => ({ old: b, new: a }),
  },
];

const getSettingActions = (b, a) => settingActions.find(({ check }) => check(b, a));

const buildAst = (before, after) => Object.keys({ ...before, ...after })
  .reduce((acc, key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    const { state, process } = getSettingActions(beforeValue, afterValue);
    const children = state === 'node'
      ? buildAst(beforeValue, afterValue)
      : [];
    const value = process(beforeValue, afterValue);
    const record = {
      key,
      state,
      value,
      children,
    };
    return acc.concat(record);
  },
  []);

export default (pathToFile1, pathToFile2) => {
  const fileType1 = path.extname(pathToFile1);
  const fileType2 = path.extname(pathToFile2);
  const beforeData = fs.readFileSync(pathToFile1, 'UTF-8');
  const afterData = fs.readFileSync(pathToFile2, 'UTF-8');
  const before = parse(fileType1, beforeData);
  const after = parse(fileType2, afterData);
  const ast = buildAst(before, after);
  // console.log(JSON.stringify(ast, null, '\t'));
  return render(ast);
};
