import fs from 'fs';
import gendiff from '../src';

const path = `${__dirname}/__fixtures__`;
const expected = fs.readFileSync(`${path}/expected.txt`, 'UTF-8');
const before = `${path}/before`;
const after = `${path}/after`;

test.each(['.json', '.yml', '.ini'])(
  '%s',
  format => expect(gendiff(`${before}${format}`, `${after}${format}`)).toEqual(expected),
);
