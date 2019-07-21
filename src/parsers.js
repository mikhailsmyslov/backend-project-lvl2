import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'UTF-8');
  const parse = parsers[fileExtension];
  return parse(content);
};
