import fs from 'fs';
import gendiff from '../src';

const path = `${__dirname}/__fixtures__`;
const expected = fs.readFileSync(`${path}/expected.txt`, 'UTF-8');
const expectedRecursive = fs.readFileSync(`${path}/expectedRecursive.txt`, 'UTF-8');
const expectedPlain = fs.readFileSync(`${path}/expectedPlain.txt`, 'UTF-8');
const before = `${path}/before`;
const after = `${path}/after`;
const beforeRecursive = `${path}/beforeRecursive`;
const afterRecursive = `${path}/afterRecursive`;

test.each(['.json', '.yml', '.ini'])(
  'Flat %s',
  format => expect(gendiff(`${before}${format}`, `${after}${format}`))
    .toEqual(expected),
);

test.each(['.json', '.yml', '.ini'])(
  'Recursive %s',
  format => expect(gendiff(`${beforeRecursive}${format}`, `${afterRecursive}${format}`))
    .toEqual(expectedRecursive),
);

test('plain', () => expect(gendiff(`${beforeRecursive}.json`, `${afterRecursive}.json`, 'plain')).toEqual(expectedPlain));
