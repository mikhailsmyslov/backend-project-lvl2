import fs from 'fs';
import gendiff from '../src';

const path = `${__dirname}/__fixtures__/`;

test.each(['.json', '.yml', '.ini'])('Tree %s',
  (format) => {
    const expected = fs.readFileSync(`${path}expectedTree.txt`, 'UTF-8');
    const oldConfig = `${path}oldConfig${format}`;
    const newConfig = `${path}newConfig${format}`;
    expect(gendiff(oldConfig, newConfig)).toEqual(expected);
  });

test('Plain', () => {
  const expected = fs.readFileSync(`${path}expectedPlain.txt`, 'UTF-8');
  const oldConfig = `${path}oldConfig.json`;
  const newConfig = `${path}newConfig.json`;
  expect(gendiff(oldConfig, newConfig, 'plain')).toEqual(expected);
});
