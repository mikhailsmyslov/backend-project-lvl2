import fs from 'fs';
import gendiff from '../src';

const expected = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'UTF-8');

test('JSON', () => {
  const before = `${__dirname}/__fixtures__/before.json`;
  const after = `${__dirname}/__fixtures__/after.json`;
  expect(gendiff(before, after)).toEqual(expected);
});

test('YAML', () => {
  const before = `${__dirname}/__fixtures__/before.yml`;
  const after = `${__dirname}/__fixtures__/after.yml`;
  expect(gendiff(before, after)).toEqual(expected);
});
