import fs from 'fs';
import gendiff from '../src';

const path = `${__dirname}/__fixtures__`;

const expectedDefault = fs.readFileSync(`${path}/expectedDefault.txt`, 'UTF-8');
const expectedPlain = fs.readFileSync(`${path}/expectedPlain.txt`, 'UTF-8');

const oldConfig = `${path}/oldConfig`;
const newConfig = `${path}/newConfig`;

test.each(['.json', '.yml', '.ini'])(
  'Default %s',
  format => expect(gendiff(`${oldConfig}${format}`, `${newConfig}${format}`))
    .toEqual(expectedDefault),
);

test('Plain', () => expect(gendiff(`${oldConfig}.json`, `${newConfig}.json`, 'plain')).toEqual(expectedPlain));
