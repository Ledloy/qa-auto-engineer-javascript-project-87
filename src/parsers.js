import fs from 'fs';
import path from 'path';
import { parse } from 'yaml'; 

const getParser = (filepath) => {
  const ext = path.extname(filepath).slice(1);
  
  const parsers = {
    json: (data) => JSON.parse(data),
    yml: (data) => parse(data),     
    yaml: (data) => parse(data),     
  };
  
  return parsers[ext];
};

export default (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const parser = getParser(filepath);
  return parser(data);
};