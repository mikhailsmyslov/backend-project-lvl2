import fs from 'fs';
import gendiff from '../src';

const text = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'UTF-8');

const before = `${__dirname}/__fixtures__/before.json`;
const after = `${__dirname}/__fixtures__/after.json`;

test('jest working test', () => {
  expect(gendiff(before, after)).toEqual(text);
});
