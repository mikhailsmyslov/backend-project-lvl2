#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<oldConfig> <newConfig>')
  .option('-f, --format [type]', 'output format')
  .action((oldConfig, newConfig) => console.log(gendiff(oldConfig, newConfig, program.format)));

program.parse(process.argv);

if (program.args.length === 0) program.help();
