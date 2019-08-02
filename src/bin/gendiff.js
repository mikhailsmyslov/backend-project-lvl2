#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'help')
  .action((first, second) => {
    console.log(gendiff(first, second, program.format));
  });

program.parse(process.argv);
