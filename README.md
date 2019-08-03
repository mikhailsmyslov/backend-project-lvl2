## Difference Generator
______________________
#### by Mikhail Smyslov

[![Build Status](https://travis-ci.com/mikhailsmyslov/backend-project-lvl2.svg?branch=master)](https://travis-ci.com/mikhailsmyslov/backend-project-lvl2)
[![Maintainability](https://api.codeclimate.com/v1/badges/4a4251574ea3f5906735/maintainability)](https://codeclimate.com/github/mikhailsmyslov/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4a4251574ea3f5906735/test_coverage)](https://codeclimate.com/github/mikhailsmyslov/backend-project-lvl2/test_coverage)

### About
My second project on [Hexlet](https://ru.hexlet.io)  

Utility compares two configuration files and shows a difference. Works with .json, .yml and .ini formats.  
Output could be setted as a plain text, json or stringified tree structure.

### Installation
`npm install gendiff -g`

### Usage
[![asciicast](https://asciinema.org/a/44UQr2cncup4FLfHvlASIMah1.svg)](https://asciinema.org/a/44UQr2cncup4FLfHvlASIMah1)

`gendiff [options] <firstConfig> <secondConfig>`  

#### Options
`-f plain` - set output as a plain text;  
`-f json` - set output as a json string;  
default (no option `-f` specified) - stringified tree structure;  

For other options use `gendiff -h`
