import fs from 'fs';
import gendiff from '../src';

const obj = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const text = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'UTF-8');

const before = `${__dirname}/__fixtures__/before.json`;
const after = `${__dirname}/__fixtures__/after.json`;

test('jest working test', () => {
  expect(gendiff(before, after)).toEqual(text);
});
