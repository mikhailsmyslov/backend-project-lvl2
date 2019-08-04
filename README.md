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

![Installation demo](https://github.com/mikhailsmyslov/Pictures/blob/master/gendiff/demo_installation.gif?raw=true)

### Usage
`gendiff [options] <firstConfig> <secondConfig>`  

`-f plain` - set output as a plain text;  
![Plain demo](https://github.com/mikhailsmyslov/Pictures/blob/master/gendiff/demo_plain.gif?raw=true)
  
`-f json` - set output as a json string;  
![JSON demo](https://github.com/mikhailsmyslov/Pictures/blob/master/gendiff/demo_json.gif?raw=true)
  
#### Options
  `-V, --version`        output the version number  
  `-f, --format [type]`  output format  
  `-h, --help`           output usage information  

