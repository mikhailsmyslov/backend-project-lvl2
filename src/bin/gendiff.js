#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((first, second) => console.log(gendiff(first, second, program.format)));

program.parse(process.argv);

if (program.args.length === 0) program.help();
