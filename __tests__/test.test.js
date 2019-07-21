import fs from 'fs';
import gendiff from '../src';

const path = `${__dirname}/__fixtures__`;
const expected = fs.readFileSync(`${path}/expected.txt`, 'UTF-8');
const before = `${path}/before`;
const after = `${path}/after`;

test('JSON', () => {
  expect(gendiff(`${before}.json`, `${after}.json`)).toEqual(expected);
});

test('YAML', () => {
  expect(gendiff(`${before}.yml`, `${after}.yml`)).toEqual(expected);
});
